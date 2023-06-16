<?php
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $params = json_decode($data, true);

    if (
        isset($params['name']) && !empty($params['name']) &&
        isset($params['surname']) && !empty($params['surname']) &&
        isset($params['login']) && !empty($params['login']) &&
        isset($params['topic_id']) && !empty($params['topic_id']) &&
        isset($params['class_id']) && !empty($params['class_id'])
    ) {

        
        $update_topic_query = "UPDATE topic SET  WHERE id = {$params['topic_id']}";
        $result = mysqli_query($link, $add_class_query);

        if (!$result) {
            $response = [
                'error' => "Ошибка выполнения запроса: " . mysqli_error($link)
            ];
            http_response_code(500);
        }

        http_response_code(201);
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
} else {
    http_response_code(405);
}
