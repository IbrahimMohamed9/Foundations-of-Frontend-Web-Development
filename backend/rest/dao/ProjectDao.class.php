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
            $user_project = [
                'user_id' => $payload['user_id'],
                'price' => $payload['price'],
                'position' => $payload['position']
            ];
            $project = [
                'price' => $payload['price'],
                'end_date' => $payload['end_date'],
                'item_id' => $payload['item_id']
            ];
            $this->beginTransaction();
            $query = "INSERT INTO projects (item_id, price, end_date) VALUES (:item_id, :price, :end_date)";
            $this->execute($query, $project);

            $query = "SELECT LAST_INSERT_ID() AS project_id";
            $lastInserted = $this->query_unique_first($query, []);
            if ($lastInserted && isset($lastInserted['project_id'])) {
                $user_project['project_id'] = $lastInserted['project_id'];
                $query = "INSERT INTO user_projects 
                        (user_id, project_id, price, position) 
                    VALUES (:user_id, :project_id, :price, :position)";
                $this->execute($query, $user_project);

                $this->commit();
            } else {
                $this->rollBack();
            }
        } catch (PDOException $e) {
            $this->rollBack();
        }
    }
    public function add_user_project($payload)
    {
        $user_project = [
            'user_id' => $payload['user_id'],
            'project_id' => $payload['project_id'],
            'position' => $payload['position']
        ];
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
                            JOIN items i ON p.item_id = i.item_id
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
    public function get_projects_by_category($category)
    {
        $query = "SELECT * FROM projects WHERE category = :category";
        return $this->query($query, ['category' => $category]);
    }
    public function get_project_by_id($project_id)
    {
        $query = "SELECT * FROM projects WHERE project_id = :project_id";
        return $this->query_unique_first($query, ['project_id' => $project_id]);
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
