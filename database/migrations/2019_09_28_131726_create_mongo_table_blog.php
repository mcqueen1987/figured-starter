<?php

use Illuminate\Support\Facades\Schema;
use Jenssegers\Mongodb\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class CreateMongoTableBlog extends Migration
{

    protected $connection = 'mongodb';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)
            ->table('mongo_table_blog', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string("title");
                $table->text("content");
                $table->string("author");
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)
            ->table('mongo_table_blog', function (Blueprint $collection) {
                $collection->drop();
            });
    }
}

