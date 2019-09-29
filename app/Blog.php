<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Blog extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'Blog';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'content'
    ];

    public function cast()
    {
        return [
            "id" => $this->_id,
            "title" => $this->title,
            "content" => $this->content
        ];
    }
}