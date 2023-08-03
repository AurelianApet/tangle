<?php
    ini_set('display_errors', '0');

    header("Content-Type: text/html; charset=UTF-8");

    require_once("../php/config.php");

    // POST 요청으로부터 데이터 가져오기
    $type = $_POST['type'];
    $subEmail = $_POST['subEmail'];
    $createdAt = $_POST['createdAt'];
    $deleteYn = $_POST['deleteYn'];

    // MySQL 연결 생성
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // 데이터베이스에 데이터 삽입
    $sql = "INSERT INTO tbl_subscription_email (sub_email, created_at, delete_yn) VALUES ('$subEmail', '$createdAt', '$deleteYn')";
    if ($conn->query($sql) === TRUE) {
        echo "구독이 성공적으로 등록되었습니다.";
    } else {
        echo "오류: " . $sql . "<br>" . $conn->error;
    }

    // MySQL 연결 닫기
    $conn->close();
?>