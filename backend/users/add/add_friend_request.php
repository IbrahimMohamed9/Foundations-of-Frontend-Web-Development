<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$payload = [
  'requester_id' => $_REQUEST['requester_id'],
  'requested_id' => $_REQUEST['requested_id']
];

$user_service = new UserService();

$user_service->add_friend_request($payload);
