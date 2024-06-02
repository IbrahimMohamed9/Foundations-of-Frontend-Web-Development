<?php
require '../../vendor/autoload.php';
require_once dirname(__FILE__) . "/../config.php";

use Ratchet\MessageComponentInterface;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Chat implements MessageComponentInterface
{
    private $clients = [];
    private $userInfos = [];

    public function onOpen($conn)
    {
        $this->clients[$conn->resourceId] = $conn;
    }

    private function removeIfExist($id)
    {
        foreach ($this->userInfos as $index => $info) {
            if ($this->extractId($index) == $id) {
                $prevConnection = $this->clients[$index];
                $prevConnection->send("You have been connected on another device.");
                $prevConnection->close();
                return false;
            }
        }
        return true;
    }

    private function addNewConnection($conn, $msg)
    {
        $data = json_decode($msg, true);
        $decoded_token = [];
        try {
            $decoded_token = JWT::decode($data['token'], new Key(Config::JWT_SECRET(), 'HS256'));

            $conName = $decoded_token->user->name;
            $conId = $decoded_token->user->user_id;
            $sendMessage = $this->removeIfExist($conId);
            $this->userInfos[$conn->resourceId] = $conName . "**_ID_**" . $conId;

            if ($sendMessage) {
                foreach ($this->clients as $client) {
                    if ($conn !== $client) {
                        $client->send("{$conName} connected");
                    }
                }
            }
        } catch (Exception $e) {
            $conn->send("You have been disconnected.");
            $conn->close();
            Flight::halt(401, $e->getMessage());
            file_put_contents('logs.txt', "SocketJWTError: " . $e->getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);
        }
    }

    private function extractId($index)
    {
        return explode("**_ID_**", $this->userInfos[$index])[1];
    }

    private function extractName($index)
    {
        return explode("**_ID_**", $this->userInfos[$index])[0];
    }

    public function onMessage($from, $msg)
    {
        if (is_array(json_decode($msg, true))) {
            $this->addNewConnection($from, $msg);
            return;
        }

        $message = $this->extractName($from->resourceId) . ": " . $msg;
        foreach ($this->clients as $client) {
            if ($from !== $client) {
                $client->send($message);
            }
        }
    }

    public function onClose($conn)
    {
        $name = $this->userInfos[$conn->resourceId];

        $findDuplicate = array_diff_assoc(
            $this->userInfos,
            array_unique($this->userInfos)
        );

        unset($this->clients[$conn->resourceId]);
        unset($this->userInfos[$conn->resourceId]);

        if (!array_search($name, $findDuplicate)) {
            $name = explode("**_ID_**", $name)[0];
            foreach ($this->clients as $client) {
                $client->send("$name has left the chat");
            }
        }
    }

    public function onError($conn, $e)
    {
        file_put_contents('logs.txt', "SocketError: " . $e->getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);
        $conn->send("You have been disconnected.");
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();
