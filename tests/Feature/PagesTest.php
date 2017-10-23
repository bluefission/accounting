<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PagesTest extends TestCase
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

    public function testLoginPageCodeIs200()
    {

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testDashboardPageCodeIs200()
    {

        $response = $this->get('/home');

        $response->assertStatus(200);
    }

    public function testSettingsPageCodeIs200()
    {

        $response = $this->get('/settings');

        $response->assertStatus(200);
    }

    public function TesSalesPageCodeIs200()
    {

        $response = $this->get('/sales');

        $response->assertStatus(200);
    }

    public function testInventoryPageCodeIs200()
    {

        $response = $this->get('/inventory');

        $response->assertStatus(200);
    }

    public function testExpensesPageCodeIs200()
    {

        $response = $this->get('/expenses');

        $response->assertStatus(200);
    }

    // public function testSalariesPageCodeIs200()
    // {

    //     $response = $this->get('/salaries');

    //     $response->assertStatus(200);
    // }

    public function testEmployeesPageCodeIs200()
    {

        $response = $this->get('/employees');

        $response->assertStatus(200);
    }

    public function testCustomersPageCodeIs200()
    {

        $response = $this->get('/customers');

        $response->assertStatus(200);
    }

    public function testReportsPageCodeIs200()
    {

        $response = $this->get('/reports');

        $response->assertStatus(200);
    }

}
