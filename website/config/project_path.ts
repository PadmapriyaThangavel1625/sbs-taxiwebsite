// config/project_path.ts

export const project_type = "taxi" as const;

export const base_url = "https://sbstechnologies.in";

export const project_url =
  `${base_url}/travels`;

export const api_url =
  `${project_url}/api`;

export const url_path = {
  base: base_url,
  project: project_url,
  api: api_url,

  register:
    `${api_url}/users/register.php`,

  login:
    `${api_url}/users/login.php`,

  profile:
    `${api_url}/users/profile.php`,

  update_profile:
    `${api_url}/users/update-profile.php`,

  address:
    `${api_url}/users/addresses.php`,

  add_address:
    `${api_url}/users/add-address.php`,

  ride_history:
    `${api_url}/users/ride-history.php`,

  create_ride:
    `${api_url}/rides/create.php`,

  vehicle:
    `${api_url}/rides/vehicle.php`,

  accept_ride:
    `${api_url}/rides/accept.php`,

  ride_details:
    `${api_url}/rides/details.php`,

  ride_status:
    `${api_url}/rides/status-history.php`,

  arriving:
    `${api_url}/rides/arriving.php`,

  arrived:
    `${api_url}/rides/arrived.php`,

  start_ride:
    `${api_url}/rides/start.php`,

  add_stop:
    `${api_url}/rides/add-stop.php`,

  cancel_ride:
    `${api_url}/rides/cancel.php`,

  complete_ride:
    `${api_url}/rides/complete.php`,
} as const;