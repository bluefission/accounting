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

    public function TestLoginPageCodeIs200()
    {

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function TestDashboardPageCodeIs200()
    {

        $response = $this->get('/home');

        $response->assertStatus(200);
    }

    public function TestSettingsPageCodeIs200()
    {

        $response = $this->get('/settings');

        $response->assertStatus(200);
    }

    public function TesSalesPageCodeIs200()
    {

        $response = $this->get('/sales');

        $response->assertStatus(200);
    }

    public function TestInventoryPageCodeIs200()
    {

        $response = $this->get('/inventory');

        $response->assertStatus(200);
    }

    public function TestExpensesPageCodeIs200()
    {

        $response = $this->get('/expenses');

        $response->assertStatus(200);
    }

    public function TestSalariesPageCodeIs200()
    {

        $response = $this->get('/salaries');

        $response->assertStatus(200);
    }

    public function TestEmployeesPageCodeIs200()
    {

        $response = $this->get('/employees');

        $response->assertStatus(200);
    }

    public function TestCustomersPageCodeIs200()
    {

        $response = $this->get('/customers');

        $response->assertStatus(200);
    }

    public function TestReportsPageCodeIs200()
    {

        $response = $this->get('/reports');

        $response->assertStatus(200);
    }

}
