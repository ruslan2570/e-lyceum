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

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = file_get_contents('php://input');
    $params = json_decode($data, true);
  
    if (
        isset($params['name']) && !empty($params['name']) &&
        isset($params['surname']) && !empty($params['surname']) &&
        isset($params['login']) && !empty($params['login']) &&
        isset($params['topic_id']) && !empty($params['topic_id']) &&
        isset($params['class_id']) && !empty($params['class_id'])
    ) {


        $check_topic_query = "SELECT * FROM topic WHERE id = $params[topic_id] AND student_id IS NULL";
        $check_topic_result = mysqli_query($link, $check_topic_query);
        $num_row = mysqli_num_rows($check_topic_result);

        if ($num_row == 1) {
            $add_student_query = "INSERT INTO student(lastname, firstname, login, class_id) VALUE('$params[surname]',"
                . "'$params[name]', '$params[login]', $params[class_id])";


            $add_student_query_result = mysqli_query($link, $add_student_query);
            $student_id = mysqli_insert_id($link);
            $date_nom = date_create();
            $formatted_date = date_format($date_nom, 'Y-m-d H:i:s');
            $update_topic_query = "UPDATE topic SET student_id = $student_id, selection_date = '$formatted_date' WHERE id = $params[topic_id]";
            $update_topic_result = mysqli_query($link, $update_topic_query);
            
            if(!$update_topic_result || !$add_student_query_result){
                http_response_code(500);
                echo mysqli_error($link);
            }
            http_response_code(201);
        } else{
            http_response_code(409);
        }
        
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
} 
else if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
}
else {
    http_response_code(405);
}
