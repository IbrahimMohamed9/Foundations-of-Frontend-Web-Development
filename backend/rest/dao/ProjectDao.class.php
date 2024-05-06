<?php

require_once __DIR__ . '/BaseDao.class.php';

class ProjectsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('projects');
    }
    public function add_project($payload)
    {
        try {
            $this->beginTransaction();
            $this->insert("projects", [
                'price' => $payload['price'],
                'end_date' => $payload['end_date'],
                'cart_item_id' => $payload['cart_item_id']
            ]);

            $query = "SELECT LAST_INSERT_ID() AS project_id FROM projects";
            $project_id = $this->query_unique_last($query, [])['project_id'];

            if ($project_id) {
                $this->insert("user_projects", [
                    'user_id' => $payload['user_id'],
                    'price' => $payload['price'],
                    'position' => $payload['position'],
                    'project_id' => $project_id
                ]);

                $this->commit();
            } else {
                $this->rollBack();
            }
        } catch (PDOException $e) {
            print_r($e);

            $this->rollBack();
        }
    }
    public function add_user_project($user_project)
    {
        $query = "INSERT INTO user_projects (user_id, project_id, position)
            VALUES (:user_id, :project_id, :position)";
        $this->execute($query, $user_project);
    }
    public function get_projects()
    {
        $query = "SELECT p.project_id,
                    p.start_date,
                    p.status,
                    p.price AS project_price,
                    i.name  AS item_name,
                    i.intro AS item_intro,
                    GROUP_CONCAT(
                            CONCAT_WS('|', u.user_id, up.position, u.name, u.img)
                            SEPARATOR ',') AS project_team
                    FROM projects p
                            JOIN cart_items ci ON p.cart_item_id = ci.cart_item_id
                            JOIN items i ON i.item_id = ci.item_id
                            JOIN user_projects up ON p.project_id = up.project_id
                            JOIN users u ON u.user_id = up.user_id
                    GROUP BY p.project_id,
                            p.start_date,
                            p.status,
                            project_price,
                            item_name,
                            item_intro
                    ORDER BY p.status DESC";

        return $this->query($query, []);
    }
    public function get_project_by_id($project_id)
    {
        $query = "SELECT * FROM projects WHERE project_id = :project_id";
        return $this->query_unique_first($query, ['project_id' => $project_id]);
    }
    public function get_user_project($id)
    {
        $query = "SELECT u.name,
        u.email,
        u.user_id,
        u.phone,
        u.img,
        u.joined_date,
        u.job_title,
        u.level,
        u.ratings,
        u.gender,
        COUNT(up.user_id) AS projects
    FROM users AS u
            LEFT JOIN user_projects up ON u.user_id = up.user_id
    WHERE up.user_id = :user_id AND up.project_id = :project_id
    GROUP BY u.name,
            u.email,
            u.img,
            u.phone,
            u.joined_date,
            u.job_title,
            u.level,
            u.ratings,
            u.gender,
            u.user_id";

        return $this->query_unique_first($query, [
            'user_id' => $id['user_id'],
            'project_id' => $id['project_id']
        ]);
    }
    public function delete_project($project_id)
    {
        $query = "DELETE FROM projects WHERE project_id = :project_id";
        return $this->execute($query, ['project_id' => $project_id]);
    }
    public function edit_project($project)
    {
        $query = "UPDATE projects SET 
            title = :title, 
            img_src = :img_src, 
            country = :country, 
            category = :category, 
            img_desc = :img_desc, 
            status = :status, 
            added_time = :added_time, 
            description = :description, 
            content = :content 
            WHERE project_id = :project_id";
        $this->execute($query, $project);
    }
}
