<?php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

// Database access credentials
define('SSH_HOSTNAME', '66.29.153.87:');
define('SSH_PORT', 21098);
define('SSH_USERNAME', 'balqgivg');
define('SSH_PASSWORD', 'zx?MD;S&vvLEauiETDTTmq2DX+#MA8');

class Config
{
    public static function DB_NAME()
    {
        return Config::get_env("DB_NAME", "balqgivg_main");
    }
    public static function DB_PORT()
    {
        return Config::get_env("DB_PORT", 3306);
    }
    public static function DB_USER()
    {
        return Config::get_env("DB_USER", "balqgivg_ibrahim");
    }
    public static function DB_PASS()
    {
        return Config::get_env("DB_PASS", "c+B[lFI]nseY");
    }
    public static function DB_HOST()
    {
        return Config::get_env("DB_HOST", "127.0.0.1");
    }

    public static function JWT_SECRET()
    {
        return Config::get_env("JWT_SECRET", '@Fm+1h+])w_:VcViWxVzHcuXLT&#H:2/-J5B');
    }

    public static function get_env($name, $default)
    {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}
