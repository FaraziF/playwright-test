import { expect, request, test as setup } from '@playwright/test';
import { endPoints } from '../utils/apiEndPoints';
import { ApiUtils } from '../utils/apiUtils';
import { payloads } from '../utils/payloads';
import { data } from '../utils/testdata';

import fs from 'fs';
import path from 'path';
import { BannerImageResponseType } from '../utils/types/image';
import { helpers } from '../utils/helpers';

let apiUtils: any;
let coupon_id: string;
let title: string;
let defaultAddressId;
let newLocationId;
let invitedTeamMemberEmail;
let VENDOR_ID;
let VENDOR_SLUG;
let VENDOR_STORE_NAME;
let bannerURL;
let bannerID;
let banner_id;
let logo_id;
let logoID;
let logoURL;

const { BANNER_ID } = process.env;
const { LOGO_ID } = process.env;

let vendorAuth = {
  Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
};

// export async function uploadsetup() {

setup.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

setup.describe('Upload banner and logo', () => {
  setup.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
      strategy: 'vendor',
    },
  });
  // // Define the paths for the banner and logo images
  const bannerImagePath = path.resolve(__dirname, '../utils/images/apple.png');
  const logoImagePath = path.resolve(__dirname, '../utils/images/logo.png');

  // Ensure the files exist
  if (!fs.existsSync(bannerImagePath)) {
    throw new Error(`Banner file does not exist at path: ${bannerImagePath}`);
  }

  if (!fs.existsSync(logoImagePath)) {
    throw new Error(`Logo file does not exist at path: ${logoImagePath}`);
  }

  // Read the files
  const bannerImageBuffer = fs.readFileSync(bannerImagePath);
  const logoImageBuffer = fs.readFileSync(logoImagePath);

  setup('Upload Store banner', async () => {
    // Send the POST request with banner and logo images
    const [response, responseBody] = await apiUtils.post(
      endPoints.vendorUploadBannerImage,
      {
        multipart: {
          file: {
            name: 'apple.png',
            mimeType: 'image/png',
            buffer: bannerImageBuffer,
          },
        },
      }
    );
    // Check if the response is OK
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    bannerURL = res.data.url as BannerImageResponseType;
    bannerID = res.data.id as BannerImageResponseType;
    //  console.log(responseBody);
  });

  setup('Upload Logo ', async () => {
    // Send the POST request with banner and logo images
    const [response, responseBody] = await apiUtils.post(
      endPoints.vendorUploadLogoImage,
      {
        multipart: {
          file: {
            name: 'logo.png',
            mimeType: 'image/png',
            buffer: logoImageBuffer,
          },
        },
      }
    );
    // Check if the response is OK
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    logoURL = res.data.url as BannerImageResponseType;
    logoID = res.data.id as BannerImageResponseType;
    //  console.log(responseBody);
  });

  setup('Save banner and logo image', async () => {
    //  console.log("Banner-ID", bannerID )
    //  console.log("Logo-ID", logoID )
    const [response, responseBody] = await apiUtils.put(
      endPoints.vendorSaveBanerImage,
      { data: payloads.vendorSaveBannerImage(bannerID, logoID) }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = (await response.json()) as BannerImageResponseType;
    banner_id = res.data.banner.id;
    logo_id = res.data.logo.id;
    //  console.log("BannerID", banner_id)
    //  console.log("LogoID", logo_id)
    helpers.createEnvVar('BANNER_ID', banner_id);
    helpers.createEnvVar('LOGO_ID', logo_id);
  });
});

// }
// export default uploadsetup();
