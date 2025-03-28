export const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu Mae cenas eget
            condimentum velit, sit amet feugiat lectus. Class aptent taciti
            sociosqu`;
export const MIN_PERSON_CATER = 10;
export const MAX_PERSON_CATER = 50;
export const ADMIN_EMAIL =
  process.env.NODE_ENV == "development"
    ? "sabamanjavidze@gmail.com"
    : "r.muzashvili@gurme.ge";
export const TBC_BASE_URL = "https://api.tbcbank.ge";
export const TBC_RETURN_URL =
  process.env.NODE_ENV == "production"
    ? "https://gurme.ge/tbc/callback"
    : "http://localhost:3000/tbc/callback";
