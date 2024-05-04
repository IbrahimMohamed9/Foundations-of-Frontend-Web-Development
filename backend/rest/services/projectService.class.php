<?php

require_once __DIR__ . '/../dao/ProjectDao.class.php';

class ProjectsService
{
    private $projects_dao;
    public function __construct()
    {
        $this->projects_dao = new ProjectsDao();
    }
    public function add_project($projects)
    {
        return $this->projects_dao->add_project($projects);
    }
    public function add_user_project($projects)
    {
        return $this->projects_dao->add_user_project($projects);
    }
    public function get_projects()
    {
        return $this->projects_dao->get_projects();
    }
    public function get_projects_by_category($category)
    {
        return $this->projects_dao->get_projects_by_category($category);
    }
    public function get_projects_by_id($projects_id)
    {
        return $this->projects_dao->get_project_by_id($projects_id);
    }
    public function delete_projects($projects_id)
    {
        return $this->projects_dao->delete_project($projects_id);
    }
    public function edit_projects($projects)
    {

        $this->projects_dao->edit_project($projects);
    }
}
