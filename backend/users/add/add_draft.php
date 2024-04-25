<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$payload = $_REQUEST;

$user_service = new UserService();

if (isset($_REQUEST['draft_id'])) {
  $user_service->edit_user_draft($payload);
} else {
  unset($payload['draft_id']);
  $user_service->add_user_draft($payload);
}
