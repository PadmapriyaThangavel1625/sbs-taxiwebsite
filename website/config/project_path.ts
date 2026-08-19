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


  // Authentication

  register: `${api_url}/users/register.php`,

  login: `${api_url}/users/login.php`,


  // Profile

  profile: `${api_url}/users/profile.php`,

  update_profile: `${api_url}/users/update-profile.php`,


  // Addresses

  address: `${api_url}/users/addresses.php`,

  add_address: `${api_url}/users/add-address.php`,


  // Ride History

  ride_history: `${api_url}/users/ride-history.php`,




  // Rides

  create_ride:
    `${api_url}/rides/create.php`,


  vehicle:
    `${api_url}/rides/vehicle.php`,



  // Driver Accept Ride

  accept_ride:
    `${api_url}/rides/accept.php`,




  // Ride Details

  ride_details:
    `${api_url}/rides/details.php`,




  // Ride Status History

  ride_status:
    `${api_url}/rides/status-history.php`,




  // Driver Arriving

  arriving:
    `${api_url}/rides/arriving.php`,




  // Driver Arrived

  arrived:
    `${api_url}/rides/arrived.php`,




  // Start Ride OTP Verification

  start_ride:
    `${api_url}/rides/start.php`,




  // Add Stop During Trip

  add_stop:
    `${api_url}/rides/add-stop.php`,




  // Cancel Ride

  cancel_ride:
    `${api_url}/rides/cancel.php`,




  // Complete Ride

  complete_ride:
    `${api_url}/rides/complete.php`,



} as const;