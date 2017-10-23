<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthGuardTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    public function testLoginPageCodeIs200()
    {

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testDashboardPageCodeIs302()
    {

        $response = $this->get('/home');

        $response->assertStatus(302);
    }

    public function testSettingsPageCodeIs302()
    {

        $response = $this->get('/settings');

        $response->assertStatus(302);
    }

    public function TesSalesPageCodeIs302()
    {

        $response = $this->get('/sales');

        $response->assertStatus(302);
    }

    public function testInventoryPageCodeIs302()
    {

        $response = $this->get('/inventory');

        $response->assertStatus(302);
    }

    public function testExpensesPageCodeIs302()
    {

        $response = $this->get('/expenses');

        $response->assertStatus(302);
    }

    // public function testSalariesPageCodeIs302()
    // {

    //     $response = $this->get('/salaries');

    //     $response->assertStatus(302);
    // }

    public function testEmployeesPageCodeIs302()
    {

        $response = $this->get('/employees');

        $response->assertStatus(302);
    }

    public function testCustomersPageCodeIs302()
    {

        $response = $this->get('/customers');

        $response->assertStatus(302);
    }

    public function testReportsPageCodeIs302()
    {

        $response = $this->get('/reports');

        $response->assertStatus(302);
    }}
