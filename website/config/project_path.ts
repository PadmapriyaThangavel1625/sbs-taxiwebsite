// config/project_path.ts

export const project_type = "taxi" as const;

export const base_url =
  "https://sbstechnologies.in";

export const project_url =
  `${base_url}/travels`;

export const api_url =
  `${project_url}/api`;

export const url_path = {
  // ============================================================
  // BASE
  // ============================================================

  base: base_url,

  project: project_url,

  api: api_url,

  // ============================================================
  // PASSENGER / USER
  // ============================================================

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

  // ============================================================
  // RIDES
  // ============================================================

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

  // ============================================================
  // DRIVER
  // ============================================================

  driver_register:
    `${api_url}/drivers/register.php`,

  driver_login:
    `${api_url}/drivers/login.php`,

  driver_profile:
    `${api_url}/drivers/profile.php`,

  driver_update_profile:
    `${api_url}/drivers/update-profile.php`,

  driver_upload_profile:
    `${api_url}/drivers/upload-profile-image.php`,

  driver_details:
    `${api_url}/driver/details.php`,

  driver_update_online_status:
    `${api_url}/drivers/update-online-status.php`,

  // ============================================================
  // DRIVER DOCUMENTS
  // ============================================================

  upload_license:
    `${api_url}/drivers/upload-license.php`,

  upload_rc:
    `${api_url}/drivers/upload-rc.php`,

  upload_insurance:
    `${api_url}/drivers/upload-insurance.php`,

  upload_vehicle:
    `${api_url}/drivers/upload-vehicle.php`,
} as const;