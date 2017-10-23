<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderEndpointTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function setup() {
        parent::setup();
        $user = new \App\User(array('name' => 'John')); $this->be($user);
    }

    public function testOrdersGet()
    {
        $response = $this->get('/api/orders');
        $response->assertStatus(200);        
    }

    public function testOrdersPost()
    {
        $response = $this->post('/api/orders');
        $response->assertStatus(200);        
    }

    public function testOrdersPut()
    {
        $response = $this->put('/api/orders');
        $response->assertStatus(200);        
    }

    public function testOrdersDelete()
    {
        $response = $this->delete('/api/orders');
        $response->assertStatus(200);        
    }
}
