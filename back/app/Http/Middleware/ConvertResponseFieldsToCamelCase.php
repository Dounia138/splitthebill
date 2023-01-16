<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ConvertResponseFieldsToCamelCase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($response->headers->get('Content-Type') === 'application/json') {
            $a = $this->convertToCamelCase(json_decode($response->getContent(), true));
            $response->setContent(json_encode($a));
        }

        return $response;
    }

    /**
     * Convert the given JSON string to camelCase.
     *
     * @param  mixed  $data
     * @return mixed
     */
    private function convertToCamelCase($data)
    {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_string($key)) {
                    $data[$this->toCamelCase($key)] = $this->convertToCamelCase($value);
                } else {
                    $data[$key] = $this->convertToCamelCase($value);
                }
            }

            foreach ($data as $key => $value) {
                if (is_string($key) && $key !== $this->toCamelCase($key)) {
                    unset($data[$key]);
                }
            }
        }

        return $data;
    }

    /**
     * Convert the given string to camelCase.
     *
     * @param  string  $string
     * @return string
     */
    private function toCamelCase(string $string): string
    {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $string))));
    }
}
