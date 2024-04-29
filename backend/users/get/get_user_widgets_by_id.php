<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$payload = $_REQUEST;

$user_service = new UserService();

if (count($payload) > 1) {
  $user_service->edit_user_widgets($payload);
} else {
  $widgets = $user_service->get_user_widgets_by_id($payload['user_id']);
  header('Content-Type: application/json');
  echo json_encode($widgets);
}
