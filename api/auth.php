<?php

require_once('../token_validator.php');
$config = include '../db_config.php';

// Подключение к БД
$db_host = $config["host"];
$db_user = $config["user"];
$db_password = $config["password"];
$db_name = $config["db"];

$link = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if ($link === false) {
    die("Ошибка: " . mysqli_connect_error());
}

$data = file_get_contents('php://input');
$params = json_decode($data, true);

if (isset($params['login'])) {
    $login = $params['login'];
}

if (isset($params['password'])) {
    $password = $params['password'];
}

if (isset($params['token'])) {
    $token = $params['token'];
}

if (!isset($login) && isset($password) && !isset($token)) {
    if ($password == "1234") {
        http_response_code(200);
    } else {
        http_response_code(403);
    }
}

if (isset($login) && isset($password) && !isset($token)) {
    $get_admin_query = "SELECT * FROM admin WHERE login LIKE '$login' AND password LIKE '$password'";

    $admin_result = mysqli_query($link, $get_admin_query);

    if (mysqli_num_rows($admin_result) != 0) {

        $user_id = mysqli_fetch_assoc($admin_result)['id'];

        $token = bin2hex(random_bytes(16));
        
        date_default_timezone_set('Europe/Moscow');
        // Получаем текущую дату и время
        $currentDateTime = date_create();
        // Прибавляем две недели
        $futureDateTime = date_modify($currentDateTime, '+4 weeks');
        // Форматируем дату и время в строку, соответствующую формату базы данных
        $formattedDateTime = date_format($futureDateTime, 'Y-m-d H:i:s');

        $add_token_query = "INSERT INTO session(user_id, token, expiration_date) VALUES($user_id, '$token', '$formattedDateTime')";

        mysqli_query($link, $add_token_query);
        $response = [
            'token' => $token
        ];

        echo json_encode($response);

    } else {
        http_response_code(403);
    }
}

if (!isset($login) && !isset($password) && isset($token)) {

    
    // validateToken($token, $link);

    $get_session_query = "SELECT * FROM session WHERE token = '$token'";

    $session_result = mysqli_query($link, $get_session_query);

    if(mysqli_num_rows($session_result) != 0){
        $cur_date = date(strtotime(date("Y-m-d")));
        $session_expiration_date = strtotime(mysqli_fetch_assoc($session_result)['expiration_date']);

        if($session_expiration_date > $cur_date){
            http_response_code(200);
            exit;
        }
    }
    http_response_code(403);
}