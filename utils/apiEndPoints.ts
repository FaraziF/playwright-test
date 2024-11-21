import internal from 'stream';

const env = require('../env');

require('dotenv').config();

// const LOCAL_SERVER_url = 'http://farazi.mydokan.io:3001';
// const SERVER_url = 'http://farazi.mydokan.io:8081';
const url = env('URL');

const { VENDOR_ID } = process.env;
const { VENDOR_SLUG } = process.env;
const { VENDOR_STORE_NAME } = process.env;

// const orderUrl = env('ORDER_URL');
// const userUrl = env('USER_URL');
const dashboardURL = env('DASHBOARD_URL');
const storefrontURL = env('STOREFRONT_URL');
const catalogURL = env('CATALOG_URL');
const shippingURL = env('SHIPPING_URL');
const userURL = env('USER_URL');
const paymentURL = env('PAYMENT_URL');
const taxURL = env('TAX_URL');
const reportURL = env('REPORT_URL');
const orderURL = env('ORDER_URL');
const integrationURL = env('INTEGRATION_URL');
const contentURL = env('CONTENT_URL');
const couponURL = env('COUPON_URL');
const cartURL = env('CART_URL');

export const endPoints = {
  serverurl: `${url}`,
  dashboardURL: `${dashboardURL}`,
  storefrontURL: `${storefrontURL}`,
  catalogURL: `${catalogURL}`,
  shippingURL: `${shippingURL}`,
  userURL: `${userURL}`,
  paymentURL: `${paymentURL}`,
  taxURL: `${taxURL}`,
  reportURL: `${reportURL}`,
  orderURL: `${orderURL}`,
  integrationURL: `${integrationURL}`,
  contentURL: `${contentURL}`,
  couponURL: `${couponURL}`,
  cartURL: `${cartURL}`,

  getdashboardURL: `${dashboardURL}/api/v1`,
  getstorefrontURL: `${storefrontURL}/api/v1`,
  getcatalogURL: `${catalogURL}/api/v1`,
  getshippingURL: `${shippingURL}/api/v1`,
  getuserURL: `${userURL}/api/v1`,
  getpaymentURL: `${paymentURL}/api/v1`,
  gettaxURL: `${taxURL}/api/v1`,
  getreportURL: `${reportURL}/api/v1`,
  getorderURL: `${orderURL}/api/v1`,
  getintegrationURL: `${integrationURL}/api/v1`,
  getcontentURL: `${contentURL}/api/v1`,
  getcouponURL: `${couponURL}/api/v1`,
  getcartURL: `${cartURL}/api/v1`,

  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> All Sub URL <<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

  adminDashboardLogin: `${dashboardURL}/admin/login`,
  adminDashboard: `${dashboardURL}/admin`,
  adminProductPage: `${dashboardURL}/admin/products`,
  adminProductProductCreate: `${dashboardURL}/admin/products/create`,
  adminProductProductCategory: `${dashboardURL}/admin/categories`,
  adminBrandPage: `${dashboardURL}/admin/brands`,
  adminOrderPage: `${dashboardURL}/admin/orders`,
  adminSubscriptionPage: `${dashboardURL}/admin/subscription-plans`,
  adminPayoutsPage: `${dashboardURL}/admin/payouts`,
  adminUpcommingPayoutsPage: `${dashboardURL}/`,
  adminVendorPage: `${dashboardURL}/admin/vendors`,
  adminCustomerPage: `${dashboardURL}/admin/customers`,
  adminDesignPage: `${dashboardURL}/admin/pages`,
  adminGeneralSettings: `${dashboardURL}/admin/settings/general`,
  adminTeamSettings: `${dashboardURL}/admin/settings/team`,
  adminPaymentSettingsPage: `${dashboardURL}/admin/settings/payment`,
  adminPayoutSettings: `${dashboardURL}/admin/settings/payout`,
  adminShippingSettings: `${dashboardURL}/admin/settings/shipping`,
  adminNotificationSettings: `${dashboardURL}/admin/settings/notification`,
  adminTaxSettings: `${dashboardURL}/admin/settings/tax`,
  adminSEOSettings: `${dashboardURL}/admin/settings/seo`,
  adminPoliciesSettings: `${dashboardURL}/admin/settings/policies`,

  vendorDashboardLogin: `${dashboardURL}/vendor/login`,
  vendorDashboardRegistration: `${dashboardURL}/vendor/register`,
  vendorDashboard: `${dashboardURL}/vendor`,
  vendorProductPage: `${dashboardURL}/vendor/products`,

  customerLoginPage: `${storefrontURL}/login`,
  customerRegistrationPage: `${storefrontURL}/register`,
  customerHomePage: `${storefrontURL}/`,
  customerAccountPage: `${storefrontURL}/customers/account`,
  customerShopPage: `${storefrontURL}/shop`,

  /* <<<<<<<<<<<<<<<<<<<< Admin All End points >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

  // Dashboard
  getSetupGuide: `${userURL}/api/v1/admin/setup-guide`,
  getadminDashbaordTodayReport: `${reportURL}/api/v1/reports/admin/dashboard/today`,
  getadminDashbaordHourlyReport: `${reportURL}/api/v1/reports/admin/dashboard/hourly-sales`,
  getadminDashbaordTodosReport: `${reportURL}/api/v1/reports/admin/dashboard/todos`,

  // Brands
  getAllBrands: `${catalogURL}/api/v1/brands`,
  createBrands: `${catalogURL}/api/v1/brands`,
  searchBrand: (brandName: string) =>
    `${catalogURL}/api/v1/brands?search=${brandName}`,
  editBrand: (brandID: string) => `${catalogURL}/api/v1/brands/${brandID}`,
  deleteBrand: (brandID: string) => `${catalogURL}/api/v1/brands/${brandID}`,
  paginationFilterBrand: `${catalogURL}/api/v1/brands?page=2`,

  // Products collections
  productCollectionsPage: `${dashboardURL}/admin/collections`,
  getAllProductCollections: `${catalogURL}/api/v1/product-collections`,
  createProductCollections: `${catalogURL}/api/v1/product-collections`,
  searchProductCollections: (productCollectionName: string) =>
    `${catalogURL}/api/v1/product-collections?search=${productCollectionName}`,
  editProductCollections: (productCollectionID: string) =>
    `${catalogURL}/api/v1/product-collections/${productCollectionID}`,
  deleteProductCollections: (productCollectionID: string) =>
    `${catalogURL}/api/v1/product-collections/${productCollectionID}`,
  paginationFilterProductCollections: `${catalogURL}/api/v1/product-collections?page=2`,

  // product bulk edit

  // Orders
  getAllOrders: `${orderURL}/api/v1/admin/orders?include=orderGroup`,
  getPaginationPageOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=completed&page=2`,
  getCompletedOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=completed`,
  getProcessingOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=processing`,
  getPendingOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=pending`,
  getFailedOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=failed`,
  getCanceledOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=canceled`,
  getRefundedOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[orderStatus]=refunded`,
  getPaginationOrder: `${orderURL}/api/v1/admin/orders?include=orderGroup&page=2`,
  getSingleOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}`,
  searchOrder: (orderNo: number) =>
    `${orderURL}/api/v1/admin/orders?include=orderGroup&filters[search]=${orderNo}`,
  updateShippingAddress: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}/shipping`,
  updateBillingAddress: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}/billing`,
  putOnHoldOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}/on-hold`,
  removeHoldOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}/remove-hold`,
  cancelOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}/cancel`,

  getPaymentID: (singleOrderID: string) =>
    `${paymentURL}/api/v1/orders/${singleOrderID}/payments`,
  createShipment: `${orderURL}/api/v1/shipments`,
  chargeOrder: (singleOrderID: string) =>
    `${paymentURL}/api/v1/orders/${singleOrderID}/charges`,
  refundOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/admin/orders/${singleOrderID}/refunds`,

  // Subcription
  getAllSubscription: `${userURL}/api/v1/subscriptions/plans`,
  getPublishSubscription: `${userURL}/api/v1/subscriptions/plans?filters[status]=published`,
  getDraftSubscription: `${userURL}/api/v1/subscriptions/plans?filters[status]=draft`,
  getPaginationSubscription: `${userURL}/api/v1/subscriptions/plans?page=2`,
  createNewSubscription: `${userURL}/api/v1/subscriptions/plans`,
  editCreatedSubscription: (subscriptionID: number) =>
    `${userURL}/api/v1/subscriptions/plans/${subscriptionID}`,
  saveDraftSubscription: (subscriptionID: number) =>
    `${userURL}/api/v1/subscriptions/plans/${subscriptionID}`,
  deleteCreatedSubscription: (subscriptionID: number) =>
    `${userURL}/api/v1/subscriptions/plans/${subscriptionID}`,

  // Payouts
  getAllPayouts: `${paymentURL}/api/v1/admin/withdrawals`,
  getPendingPayouts: `${paymentURL}/api/v1/admin/withdrawals?filters[status]=pending`,
  getCompletedPayouts: `${paymentURL}/api/v1/admin/withdrawals?filters[status]=accepted`,
  getCancelledPayouts: `${paymentURL}/api/v1/admin/withdrawals?filters[status]=cancelled`,
  getRejectedPayouts: `${paymentURL}/api/v1/admin/withdrawals?filters[status]=rejected`,
  getUpcommingPayouts: `${paymentURL}/api/v1/admin/upcoming-withdrawals?filters[status]=upcoming`,
  getVendorSearchPayouts: `${userURL}/api/v1/vendors?search=vendor&paginate=0`,
  getPaginationPayouts: `${paymentURL}/api/v1/admin/withdrawals?page=2`,

  // vendors
  getAllVendors: `${userURL}/api/v1/admin/vendors`,
  getVerifiedVendors: `${userURL}/api/v1/admin/vendors?filters[active]=true`,
  getPendingVendors: `${userURL}/api/v1/admin/vendors?filters[active]=false`,
  getInactiveVendors: `${userURL}/api/v1/admin/vendors?filters[status]=inactive`,
  getVacationVendors: `${userURL}/api/v1/admin/vendors?filters[status]=vacation`,
  getSuspendedVendors: `${userURL}/api/v1/admin/vendors?filters[status]=suspended`,
  getHoldPayoutVendors: `${userURL}/api/v1/admin/vendors?filters[status]=hold_payout`,
  getSearchVendors: (vendorStoreName: any) =>
    `${userURL}/api/v1/admin/vendors?filters[search]=${vendorStoreName}`,
  getPaginationVendors: `${userURL}/api/v1/admin/vendors?page=2`,
  getVendorIndividualProduct: (vendorID: any) =>
    `${catalogURL}/api/v1/admin/products?filters[vendorId]=${vendorID}`,
  getIndividualVendor: (vendorID: any) =>
    `${userURL}/api/v1/admin/vendors/${vendorID}`,
  editIndividualVendorGeneralSettings: (vendorID: any) =>
    `${userURL}/api/v1/admin/vendors/${vendorID}/general`, // vendor.200 id: 6207
  getIndividualVendorSubscriptionSettings: (vendorID: any) =>
    `${userURL}/api/v1/admin/vendors/${vendorID}`,
  editIndividualVendorAddressSettings: (vendorID: any) =>
    `${userURL}/api/v1/admin/vendors/${vendorID}/address`,
  editIndividualVendorSocialSettings: (vendorID: any) =>
    `${userURL}/api/v1/admin/vendors/${vendorID}/social`,

  // customers
  getAllCustomer: `${userURL}/api/v1/admin/customers`,
  getPaginationPageCustomerData: `${userURL}/api/v1/admin/customers?filters[isActive]=true&page=2`,
  getActiveCustomer: `${userURL}/api/v1/admin/customers?filters[isActive]=true&page=1`,
  getInactiveCustomer: `${userURL}/api/v1/admin/customers?filters[isActive]=false&page=1`,
  createNewCustomer: `${userURL}/api/v1/admin/customers`,
  editCreatedCustomer: (customerID: number) =>
    `${userURL}/api/v1/admin/customers/${customerID}`,
  searchCustomer: (customerEmail: string) =>
    `${userURL}/api/v1/admin/customers?search=${customerEmail}`,
  resetCreatedCustomer: (customerID: number) =>
    `${userURL}/api/v1/admin/customers/${customerID}/password`,
  deactivatedCreatedCustomer: (customerID: number) =>
    `${userURL}/api/v1/admin/customers/${customerID}`,
  markAsCustomer: (customerID: number) =>
    `${userURL}/api/v1/users/${customerID}/mark-as-test`,
  unmarkAsCustomer: (customerID: number) =>
    `${userURL}/api/v1/users/${customerID}/mark-as-test`,
  activateCustomer: (customerID: number) =>
    `${userURL}/api/v1/admin/customers/${customerID}`,

  // integrations
  getAllIntegrations: `${integrationURL}/api/v1/admin/integrations`,
  getLiveChat: `${integrationURL}/api/v1/admin/integrations/live-chat`,
  getMailchimp: `${integrationURL}/api/v1/admin/integrations/mailchimp`,
  getSMS: `${integrationURL}/api/v1/admin/integrations/sms`,
  getAnalytics: `${integrationURL}/api/v1/admin/integrations/analytics`,
  getMarketplaceMigrator: `${userURL}/api/v1/subscriptions/plans?filters[isFreePlan]=true&filters[status]=published`,

  // pages
  getAllPages: `${contentURL}/api/v1/pages`,
  createPage: `${contentURL}/api/v1/pages`,
  editPages: (pageID) => `${contentURL}/api/v1/pages/${pageID}`,
  searchPage: (pageName: string) =>
    `${contentURL}/api/v1/pages?search=${pageName}`,
  deletePages: (pageID) => `${contentURL}/api/v1/pages/${pageID}`,
  getPaginationPages: `${contentURL}/api/v1/pages?page=2&perPage=10`,

  // Themes
  getAllThemes: `${contentURL}/api/v1/themes`,

  // Menus
  // getAllMenu:`${url}/api/v1/menus`,
  // createMenu:`${url}/api/v1/menus`,
  // editMenu: (menuID) => `${url}/api/v1/menus/${menuID}`,
  // searchMenu: (menuName: string) => `${url}/api/v1/menus?search=${menuName}`,
  // deleteMenu: (menuID) => `${url}/api/v1/menus/${menuID}`,

  // General settings
  getBasicSettings: `${userURL}/api/v1/settings/general`,
  updateMarketplaceDetails: `${userURL}/api/v1/settings/marketplace-details`,
  updateStoreVisibility: `${userURL}/api/v1/settings/store-visibility`,
  updateUnits: `${userURL}/api/v1/settings/units`,

  getBusinessDetailsSettings: `${userURL}/api/v1/settings/general`,
  updateBusinessDetails: `${userURL}/api/v1/settings/business-details`,

  getDomainSettings: `${userURL}/api/v1/settings/domain`,
  addCustomDomain: `${userURL}/api/v1/settings/domain`,
  getRefreshCustomDomain: `${userURL}/api/v1/settings/domain`,
  editCustomDomain: `${userURL}/api/v1/settings/domain`,
  removeCustomDomain: `${userURL}/api/v1/settings/domain`,

  getBrandSettings: `${userURL}/api/v1/settings/brand`,
  updateBrandSettings: `${userURL}/api/v1/settings/brand`,

  vendorOnboardingManage: `${userURL}/api/v1/settings/onboarding`,

  // team settings
  getAllTeamMember: `${userURL}/api/v1/team/admin/members`,
  getPaginationPageTeamMember: `${userURL}/api/v1/team/admin/members?page=2`,
  getActiveTeamMember: `${userURL}/api/v1/team/admin/members?page=1&filters[status]=active`,
  getInactiveTeamMember: `${userURL}/api/v1/team/admin/members?page=1&filters[status]=inactive`,
  getInvitedTeamMember: `${userURL}/api/v1/team/admin/invitations?page=1&filters[status]=invited`,
  getAllInvitedTeamMember: `${userURL}/api/v1/team/admin/invitations?filters[status]=invited`,
  inviteNewTeamMember: `${userURL}/api/v1/team/admin/members/invite`,
  getInvitedTeamMemeberToken: `${userURL}/admin/team/invitations?token=`,
  searchTeamMember: (invitedTeamMemberEmail: string) =>
    `${userURL}/api/v1/team/admin/members?search=${invitedTeamMemberEmail}`,
  editInvitedTeamMember: (invitedTeamMemberID: string) =>
    `${userURL}/api/v1/team/admin/members/${invitedTeamMemberID}`,
  resendInvitationInvitedTeamMember: `${userURL}/api/v1/team/admin/invitations/resend`,
  removeInvitedNewTeamMember: (invitedTeamMemberEmail: string) =>
    `${userURL}/api/v1/team/admin/invitations/${invitedTeamMemberEmail}`,

  // plans and bills
  getPlansAndBillsDetails: `${userURL}/api/v1/admin/billing/details`,
  getChoosePlans: `${userURL}/api/v1/admin/billing/plans`,

  // payment settings
  getStripePaymentSettings: `${userURL}/api/v1/settings/payment`,
  updateStripePaymentSettings: `${userURL}/api/v1/settings/payment`,
  getPaypalPaymentSettings: `${userURL}/api/v1/settings/payment`,
  updatePaypalPaymentSettings: `${userURL}/api/v1/settings/payment`,
  updateCashOnDeliveryPaymentSettings: `${userURL}/api/v1/settings/payment`,
  enableTestGateway: `${userURL}/api/v1/settings/payment`,

  // payouts
  getPayoutsSettings: `${userURL}/api/v1/settings/payout`,

  // shipping
  getShippingSettings: `${userURL}/api/v1/settings/shipping`,
  saveShippingSettings: `${userURL}/api/v1/settings/shipping`,
  addShippingType: `${userURL}/api/v1/settings/shipping`,
  editShippingType: `${userURL}//api/v1/shipping/types/3`, // id

  // Notification settings
  getAllNotification: `${userURL}/api/v1/settings/email-notifications`,
  enableOrderConfirmationNotification: `${userURL}/api/v1/settings/email-notifications/order-confirmation/settings`,
  enableOrderCanceledNotification: `${userURL}/api/v1/settings/email-notifications/order-canceled/settings`,
  enableOrderRefundNotification: `${userURL}/api/v1/settings/email-notifications/order-refunded/settings`,
  enableShippingConfirmationNotification: `${userURL}/api/v1/settings/email-notifications/shipping-confirmation/settings`,
  enableShippingUpdateNotification: `${userURL}/api/v1/settings/email-notifications/shipping-update/settings`,

  // tax
  getTaxSummary: `${taxURL}/api/v1/tax/summary`,
  getTaxClasses: `${taxURL}/api/v1/tax/classes`,
  addTaxCountry: (taxCountry: any) =>
    `${taxURL}/api/v1/tax/country/${taxCountry}/same`,
  manageSameTaxCountry: (sameTaxCountry: any) =>
    `${taxURL}/api/v1/tax/country/${sameTaxCountry}/same`,
  differentTaxCountry: (differentTaxCountry: any) =>
    `${taxURL}/api/v1/tax/country/${differentTaxCountry}`,
  getEditAllDifferentTaxCountry: (editAllTax: any) =>
    `${taxURL}/api/v1/tax/country/${editAllTax}`,
  editStateTaxCountry: (editStateTax: any) =>
    `${taxURL}/api/v1/tax/country/${editStateTax}`,
  deleteStateTaxCountry: (taxCountry: any, deleteState: any) =>
    `${taxURL}/api/v1/tax/country/${taxCountry}/state/${deleteState}`,
  deleteTaxCountry: (deleteTaxCountry: any) =>
    `${taxURL}/api/v1/tax/country/${deleteTaxCountry}`,
  addTaxClasses: `${taxURL}/api/v1/tax/classes`,
  renameTaxClasses: (taxClassID: number) =>
    `${taxURL}/api/v1/tax/classes/${taxClassID}`,
  deleteTaxClasses: (taxClassID: number) =>
    `${taxURL}/api/v1/tax/classes/${taxClassID}`,

  // SEO
  getSEO: `${userURL}/api/v1/settings/seo`,
  saveSEOGeneral: `${userURL}/api/v1/settings/seo/general`,
  saveSocialShare: `${userURL}/api/v1/settings/seo/social-share`,
  saveAdvanceSEO: `${userURL}/api/v1/settings/seo/advance`,
  saveSiteVerification: `${userURL}/api/v1/settings/seo/site-verification`,

  //
  getPolicies: `${userURL}/api/v1/settings/policies`,

  // Profile
  getAdminProfile: `${userURL}/api/v1/user/my-account/profile`,

  // Customer order part
  addToCart: `${cartURL}/api/v1/cart`,
  createOrder: `${orderURL}/api/v1/orders`,
  calculation: `${orderURL}/api/v1/tax/calculate`,

  // gelIndividualOrder: 'http://farazi.mydokan.io:8081/api/v1/orders/52d17a1e-8578-4d67-9c95-6a774553fb7b',
  // groupOrderList: 'http://farazi.mydokan.io:8081/api/v1/order-groups/14333385266040476/orders?paymentTransferred=true',
  // updateOrder: 'http://farazi.mydokan.io:8081/api/v1/orders/52d17a1e-8578-4d67-9c95-6a774553fb7b',
  // updateOrderByGroupId: 'http://farazi.mydokan.io:8081/api/v1/order-groups/8492405730456758/orders',
  // orderRefund: 'http://farazi.mydokan.io:8081/api/v1/orders/52d17a1e-8578-4d67-9c95-6a774553fb7b/refund',

  /*   // Customer Payment credentials
    saveCustomerPaymentCredentials: 'http://farazi.mydokan.io:8080/api/v1/payments/cards',
    detailsCustomerPaymentCredentials: 'http://farazi.mydokan.io:8080/api/v1/payments/users/johndoe@example.com/cards',

    // Payment
    createPayment: 'http://farazi.mydokan.io:8080/api/v1/payments/',
    fundTransfer: 'http://farazi.mydokan.io:8080/api/v1/payments/transfer',
    getPaymentDetails: 'http://farazi.mydokan.io:8080/api/v1/payments/62b2d11237ee0f4b3168d1cd',
    createStripeConnect: 'http://farazi.mydokan.io:8080/api/v1/payments/stripe-connect/connect',
    createPaymentRefund: 'http://farazi.mydokan.io:8080/api/v1/payments/refund',

    // Vendor Payment credentials
    saveVendorPaymentCredentials: 'http://farazi.mydokan.io:8080/api/v1/payments/credentials',
    detailsVendorPaymentCredentials: 'http://farazi.mydokan.io:8080/api/v1/payments/users/1/credentials',
    updateVendorPaymentCredentials: 'http://farazi.mydokan.io:8080/api/v1/payments/users/2/credentials',
 */

  // Tax Service
  getTax: `${taxURL}/api/v1/tax/country/${env('TAX_COUNTRY')}`,

  // Admin Product
  getAllProduct: `${catalogURL}/api/v1/admin/products`,
  getAllProductFilterPagination: `${catalogURL}/api/v1/admin/products?page=2`,
  getAllPublishedProduct: `${catalogURL}/api/v1/admin/products?filters[status]=published`,
  getAllPublishedProductFilterPagination: `${catalogURL}/api/v1/admin/products?filters[status]=published&page=2`,
  getAllDraftProduct: `${catalogURL}/api/v1/admin/products?filters[status]=draft`,
  getAllDraftProductFilterPagination: `${catalogURL}/api/v1/admin/products?filters[status]=draft&page=2`,
  individualProductGet: (product_id: string) =>
    `${catalogURL}/api/v1/products/${product_id}`,
  searchIndividualProduct: (productTitle: string) =>
    `${catalogURL}/api/v1/admin/products?search=${productTitle}`,
  createProduct: `${catalogURL}/api/v1/admin/products`,
  productUpdate: (productID: any) =>
    `${catalogURL}/api/v1/admin/products/${productID}`,
  productDelete: (productID: string) =>
    `${catalogURL}/api/v1/admin/products/${productID}`,
  exportProduct: `${catalogURL}/api/v1/admin/products/export`,
  // getCategoryFilter: `${url}/api/v1/admin/products?filters[category]=${env('CATEGORY_ID')}`,
  getCategoryFilter: (category_id: string) =>
    `${catalogURL}/api/v1/admin/products?filters[category]=${category_id}`,
  getStandardProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[type]=standard`,
  getDigitalProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[type]=digital`,
  getInStockProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[stockStatus]=available`,
  getOutOfStockProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[stockStatus]=out_of_stock`,
  getOnBackorderProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[stockStatus]=on_backorder`,
  getLowStockProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[stockStatus]=low_stock`,
  getUnmanagedProductTypeFilter: `${catalogURL}/api/v1/admin/products?filters[stockStatus]=unmanaged`,
  getVendorShippingProfile: (vendorID: string) =>
    `${shippingURL}/api/v1/shipping/vendors/${vendorID}/profiles`,
  searchProduct: (productSlug: string) =>
    `${catalogURL}/api/v1/products/${productSlug}`,

  //Category & Attribute
  categoryGetAll: `${catalogURL}/api/v1/categories`,
  categoryCreate: `${catalogURL}/api/v1/categories`,
  categoryDelete: (category_id: string) =>
    `${catalogURL}/api/v1/categories/${category_id}`,
  categoryUpdate: (categoryID: string) =>
    `${catalogURL}/api/v1/categories/${categoryID}`,
  attributeCreate: (categoryID: string) =>
    `${catalogURL}/api/v1/categories/${categoryID}/attributes`,
  attributeUpdate: (categoryID: string, attributeID: string) =>
    `${catalogURL}/api/v1/categories/${categoryID}/attributes/${attributeID}`,
  attributeDelete: (categoryID: string, attributeID: string) =>
    `${catalogURL}/api/v1/categories/${categoryID}/attributes/${attributeID}`,
  searchCategory: (categorySlug: string) =>
    `${catalogURL}/api/v1/categories/${categorySlug}`,

  // Customer
  getProductIDbyCustomer: (productID: string) =>
    `${url}/api/v1/products?search=${productID}`,
  directProduct: `https://jamuna-future-park.ondokan.com/products/digital-product?_rsc=4ifhs`,
  getShipping: `${url}/api/v1/shipping/profiles/7`,
  // getSubscription: `${url}/api/v1/vendor/subscriptions?tenant=jamuna-future-park`
  getSubscription: `${url}/api/v1/vendor/subscriptions`,
  pay: `${orderURL}/api/v1/order-groups`,

  /* <<<<<<<<<<<<<<<<< Vendor ALL End Points >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  // Vendor Login
  vendorLogin: `${dashboardURL}/api/v1/auth/login`,
  vendorDetails: `${dashboardURL}/api/v1/vendor/details?`,
  vendorMarkAsTest: (vendorCreatorID: number) =>
    `${dashboardURL}/api/v1/users/${vendorCreatorID}/mark-as-test`,
  vendorOnboardSubscriptionPage: `${dashboardURL}/vendor/onboarding/choose-plan`,

  // Get Individual Vendor details information
  getIndividualVendorInformation: `${userURL}/api/v1/vendor/details?include=defaultAddress`,

  // Dashboard
  vendorDashbaordPage: `${dashboardURL}/vendor`,
  getVendorDashbaordTodayReport: `${reportURL}/api/v1/reports/vendor/dashboard/today`,
  getVendorDashbaordHourlyReport: `${reportURL}/api/v1/reports/vendor/dashboard/hourly-sales`,
  getVendorDashbaordTodosReport: `${reportURL}/api/v1/reports/vendor/dashboard/todos`,

  // Products
  vendorProductGetAll: `${catalogURL}/api/v1/vendor/products`,
  vendorSearchIndividualProduct: (productTitle: string) =>
    `${catalogURL}/api/v1/vendor/products?search=${productTitle}`,
  vendorCreateProduct: `${catalogURL}/api/v1/vendor/products`,
  vendorProductUpdate: (productID: any) =>
    `${catalogURL}/api/v1/vendor/products/${productID}`,
  vendorProductDelete: (productID: any) =>
    `${catalogURL}/api/v1/vendor/products/${productID}`,
  getVendorPublishedProduct: `${catalogURL}/api/v1/vendor/products?filters[status]=published`,
  getVendorDraftProduct: `${catalogURL}/api/v1/vendor/products?filters[status]=draft`,
  getVendorPaginationProduct: `${catalogURL}/api/v1/vendor/products?page=2`,

  // order
  vendorGetAllOrders: `${orderURL}/api/v1/vendor/orders?include=orderGroup`,
  vendorGetPaginationPageOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=completed&page=2`,
  vendorGetCompletedOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=completed`,
  vendorGetProcessingOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=processing`,
  vendorGetPendingOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=pending`,
  vendorGetFailedOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=failed`,
  vendorGetCanceledOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=canceled`,
  vendorGetRefundedOrder: `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[orderStatus]=refunded`,
  vendorGetSingleOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}`,
  vendorSearchOrder: (orderNo: number) =>
    `${orderURL}/api/v1/vendor/orders?include=orderGroup&filters[search]=${orderNo}`,
  vendorUpdateShippingAddress: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}/shipping`,
  vendorUpdateBillingAddress: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}/billing`,
  vendorPutOnHoldOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}/on-hold`,
  vendorRemoveHoldOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}/remove-hold`,
  vendorCancelOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}/cancel`,

  vendorGetPaymentID: (singleOrderID: string) =>
    `${paymentURL}/api/v1/orders/${singleOrderID}/payments`,
  vendorCreateShipment: `${orderURL}/api/v1/shipments`,
  vendorChargeOrder: (singleOrderID: string) =>
    `${paymentURL}/api/v1/orders/${singleOrderID}/charges`,
  vendorRefundOrder: (singleOrderID: string) =>
    `${orderURL}/api/v1/vendor/orders/${singleOrderID}/refunds`,

  // Shipping
  vendorGetShippingPreferences: `${userURL}/api/v1/settings/vendor/shipping`,
  vendorSaveShippingPreferences: `${userURL}/api/v1/settings/vendor/shipping`,
  vendorGetShippingProfile: `${shippingURL}/api/v1/shipping/vendor/profiles`,
  vendorGetIndividualProfileID: `${shippingURL}/api/v1/shipping/vendor/profiles`,
  vendorCreateShippingProfile: (shippingProfileID: string) =>
    `${shippingURL}/api/v1/shipping/profiles/${shippingProfileID}/weight-rules`,
  vendorViewIndividualShippingProfile: (shippingProfileID: string) =>
    `${shippingURL}/api/v1/shipping/vendor/profiles/${shippingProfileID}`,
  vendorUpdateIndividualShippingWeightRule: (
    shippingProfileID: string,
    weightRuleID: string
  ) =>
    `${shippingURL}/api/v1/shipping/profiles/${shippingProfileID}/weight-rules/${weightRuleID}`,
  vendorGetShippingAddress: `${shippingURL}/api/v1/shipping/vendor/addresses`,

  // Payout
  vendorGetPayout: `${userURL}/api/v1/settings/vendor/payout`,
  vendorGetPayoutSummary: `${paymentURL}/api/v1/vendor/balances/summary?with_upcoming=true`,
  vendorGetCompare: `${paymentURL}/api/v1/vendor/balances/compare?from=2023-01-01&to=2023-11-30`,
  vendorGetDashboardBalance: `${paymentURL}/api/v1/vendor/balance-in?recent=true&limit=5`,
  vendorGetDashboardWithdraw: `${paymentURL}/api/v1/vendor/withdrawals?recent=true&limit=5`,
  vendorGetBalanceIN: `${paymentURL}/api/v1/vendor/balance-in`,
  vendorGetWithdraws: `${paymentURL}/api/v1/vendor/withdrawals`,

  // Vendor Coupons
  naviagteCouponPage: `${dashboardURL}/vendor`,
  vendorGetAllCoupon: `${couponURL}/api/v1/vendor/coupons`,
  vendorGetActiveCoupon: `${couponURL}/api/v1/vendor/coupons?filters[status]=active`,
  vendorGetDraftCoupon: `${couponURL}/api/v1/vendor/coupons?filters[status]=draft`,
  vendorGetExpiredCoupon: `${couponURL}/api/v1/vendor/coupons?filters[status]=expired`,

  createCoupon: `${couponURL}/api/v1/vendor/coupons`,
  getIndividualCoupon: (couponID: string) =>
    `${couponURL}/api/v1/vendor/coupons/${couponID}`,
  searchCoupon: (coupon_title: string) =>
    `${couponURL}/api/v1/vendor/coupons?search=${coupon_title}`,
  updateCoupon: (couponID: string) =>
    `${couponURL}/api/v1/vendor/coupons/${couponID}`,
  deleteCoupon: (couponID: string) =>
    `${couponURL}/api/v1/vendor/coupons/${couponID}`,

  // General Settings
  vendorGetBasicSettings: `${userURL}/api/v1/settings/vendor/general`,
  vendorSaveBasicSettings: `${userURL}/api/v1/settings/vendor/general`,
  vendorUploadBannerImage: `${contentURL}/api/v1/vendor/media/upload`,
  vendorUploadLogoImage: `${contentURL}/api/v1/vendor/media/upload`,
  vendorSaveBanerImage: `${userURL}/api/v1/settings/vendor/general`,

  vendorGetStoreDetailsSettings: `${userURL}/api/v1/settings/vendor/store-details`,
  vendorSaveStoreDetailsSettings: `${userURL}/api/v1/settings/vendor/store-details`,
  vendorGetDefaultAddressId: `${userURL}/api/v1/vendor/addresses`,
  vendorUpdateDefaultStoreAddress: (defaultAddressId: string) =>
    `${userURL}/api/v1/vendor/addresses/${defaultAddressId}`,
  vendorAddNewLocation: `${userURL}/api/v1/vendor/addresses`,
  vendorUpdateLocation: (locationId: string) =>
    `${userURL}/api/v1/vendor/addresses/${locationId}`,
  vendorDeleteLocation: (locationId: string) =>
    `${userURL}/api/v1/vendor/addresses/${locationId}`,

  // team settings
  vendorGetAllTeamMember: `${userURL}/api/v1/team/vendor/members`,
  vendorGetActiveTeamMember: `${userURL}/api/v1/team/vendor/members?filters[status]=active`,
  vendorGetInactiveTeamMember: `${userURL}/api/v1/team/vendor/members?filters[status]=inactive`,
  vendorGetInvitedTeamMember: `${userURL}/api/v1/team/vendor/invitations?filters[status]=invited`,
  vendorInviteNewTeamMember: `${userURL}/api/v1/team/vendor/members/invite`,
  vendorSearchTeamMember: (invitedTeamMemberEmail: string) =>
    `${userURL}/api/v1/team/vendor/members?search=${invitedTeamMemberEmail}`,
  vendorResendInvitationInvitedTeamMember: `${userURL}/api/v1/team/vendor/invitations/resend`,
  vendorRemoveInvitedNewTeamMember: (invitedTeamMemberEmail: string) =>
    `${userURL}/api/v1/team/vendor/invitations/${invitedTeamMemberEmail}`,

  // Payment
  vendorGetPaymentGatwey: `${paymentURL}/api/v1/vendor/gateways`,
  vendorGetPayment: `${userURL}/api/v1/settings/payment`,

  // Payout
  vendorGetPayoutSettings: `${userURL}/api/v1/settings/vendor/payout`,
  vendorUpdateManualPayout: `${userURL}/api/v1/settings/vendor/payout`,
  vendorAutomaticPayout: `${userURL}/api/v1/settings/vendor/payout`,

  // plans & bills
  getVendorPlansAndBills: `${userURL}/api/v1/vendor/onboarding/plans`,
  getVendorSubscription: `${paymentURL}/api/v1/vendor/subscriptions`,

  // live chat
  getVendorLiveChat: `${integrationURL}/api/v1/vendor/integrations/live-chat`,
  enableVendorLiveChat: `${integrationURL}/api/v1/vendor/integrations/live-chat`,

  //profile
  vendorGetProfile: `${userURL}/api/v1/user/my-account/profile`,
  vendorSaveProfile: `${userURL}/api/v1/user/my-account/profile`,

  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Customer <<<<<<<<<<<<<<<<<<<<<<<<<<< */

  customerRegister: `${storefrontURL}/api/v1/auth/register`,
  customerGetAccountDetails: `${storefrontURL}/api/v1/user/my-account/profile`,
  customerSaveAccountDetails: `${storefrontURL}/api/v1/user/my-account/profile`,

  // my orders
  customerGetAllOrders: `${orderURL}/api/v1/orders/me?per_page=4`,
  customerGetPaidOrders: `${orderURL}/api/v1/orders/me?filters[status]=paid&per_page=4`,
  customerGetUnpaidOrders: `${orderURL}/api/v1/orders/me?filters[status]=unpaid&per_page=4`,
  customerGetRefunedOrders: `${orderURL}/api/v1/orders/me?filters[status]=refunded&per_page=4`,
  customerGetAwaitingShipmentOrders: `${orderURL}/api/v1/orders/me?filters[status]=awaiting_shipment&per_page=4`,
  customerGetCompletedOrders: `${orderURL}/api/v1/orders/me?filters[status]=completed&per_page=4`,
  customerGetOrderDetails: `${orderURL}/api/v1/orders/${env(
    'CUSTOMER_ORDER_ID'
  )}`,
  customerGetOrderPagination: `${orderURL}/api/v1/orders/me?page=2&per_page=4`,

  // review management
  customerGetPendingReview: `${orderURL}/api/v1/reviews/pending?page=1&limit=10`,
  customerGetReviewHistory: `${orderURL}/api/v1/reviews?page=1&limit=10`,

  //addresses
  customerGetAddresses: `${userURL}/api/v1/user/addresses`,
  customerAddNewAddresses: `${userURL}/api/v1/user/addresses`,
  customerEditNewAddresses: (customerID: number) =>
    `${userURL}/api/v1/user/addresses/${customerID}`,
  customerDeleteNewAddresses: (customerID: number) =>
    `${userURL}/api/v1/user/addresses/${customerID}`,
};
