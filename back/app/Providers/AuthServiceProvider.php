<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\Response;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('admin', function ($user, $appartment = null) {
            return $user->is_admin && ($appartment === null || $user->appartment_id === $appartment->id)
                ? Response::allow()
                : Response::deny('You must be an administrator.');
        });

        Gate::define('admin-or-owner', function ($user, $entity, $appartment = null, $ownerField = 'id') {
            return ($user->is_admin && ($appartment === null || $user->appartment_id === $appartment->id)) || $user->id === $entity->$ownerField
                ? Response::allow()
                : Response::deny('You must be an administrator or the owner.');
        });

        Gate::define('owner', function ($user, $entity, $ownerField = 'id') {
            return $user->id === $entity->$ownerField
                ? Response::allow()
                : Response::deny('You must be the owner.');
        });

        Gate::define('resident', function ($user, $appartment) {
            return $user->appartment_id === $appartment->id
                ? Response::allow()
                : Response::deny('You must be a resident.');
        });
    }
}
