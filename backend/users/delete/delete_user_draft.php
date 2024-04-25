<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$draft_id = $_REQUEST['draft_id'];
$draft_service = new UserService();
$draft = $draft_service->delete_user_draft($draft_id);
