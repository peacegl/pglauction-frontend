//API
export const FETCH_START = 'fetch_start';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_ERROR = 'fetch_error';
export const SHOW_MESSAGE = 'show_message';
export const HIDE_MESSAGE = 'hide_message';
export const TOGGLE_APP_DRAWER = 'toggle_app_drawer';
export const UPDATING_CONTENT = 'updating_content';

//APP SETTING
export const TOGGLE_NAV_COLLAPSED = 'toggle_nav_collapsed';
export const SET_INITIAL_PATH = 'set_initial_path';

//AUTH0
export const UPDATE_AUTH_USER = 'update_auth_user';
export const SET_AUTH_TOKEN = 'set_auth_token';
export const SIGNOUT_AUTH_SUCCESS = 'signout_auth_success';

//ANALYTICS-DASHBOARD
export const GET_ANALYTICS_DATA = 'get_analytics_data';

//ECOMMERCE-DASHBOARD
export const GET_ECOMMERCE_DATA = 'get_ecommerce_data';

//ACADEMY-DASHBOARD
export const GET_ACADEMY_DATA = 'get_academy_data';

//CRM-DASHBOARD
export const GET_CRM_DATA = 'get_crm_data';

//CRYPTO-DASHBOARD
export const GET_CRYPTO_DATA = 'get_crypto_data';

//HEATH_ CARE-DASHBOARD
export const GET_HC_DATA = 'get_hc_data';

//METRICS-DASHBOARD
export const GET_METRICS_DATA = 'get_metrics_data';

//WIDGETS_DASHBOARD
export const GET_WIDGETS_DATA = 'get_widgets_data';

//MAIL-APP
export const GET_MAIL_LIST = 'get_mail_list';
export const GET_FOLDER_LIST = 'get_folder_list';
export const GET_LABEL_LIST = 'get_label_list';
export const TOGGLE_MAIL_DRAWER = 'toggle_mail_drawer';
export const COMPOSE_MAIL = 'compose_mail';
export const GET_MAIL_DETAIL = 'get_mail_detail';
export const UPDATE_MAIL_FOLDER = 'update_mail_folders';
export const UPDATE_MAIL_LABEL = 'update_mail_label';
export const UPDATE_STARRED_STATUS = 'update_starred_status';
export const UPDATED_MAIL_DETAIL = 'updated_mail_detail';
export const CHANGE_READ_STATUS = 'change_read_status';
export const GET_CONNECTION_LIST = 'get_connection_list';
export const NULLIFY_MAIL = 'nullify_mail';

//TODO-APP
export const GET_TASK_LIST = 'get_task_list';
export const CREATE_NEW_TASK = 'create_new_task';
export const TOGGLE_TODO_DRAWER = 'toggle_todo_drawer';
export const GET_TODO_FOLDER_LIST = 'GET_TODO_FOLDER_LIST';
export const GET_TODO_LABEL_LIST = 'GET_TODO_LABEL_LIST';
export const GET_TODO_STATUS_LIST = 'GET_TODO_STATUS_LIST';
export const GET_TODO_PRIORITY_LIST = 'GET_TODO_PRIORITY_LIST';
export const UPDATE_TASK_FOLDER = 'UPDATE_TASK_FOLDER';
export const UPDATE_TASK_LABEL = 'UPDATE_TASK_LABEL';
export const UPDATE_TASK_STARRED_STATUS = 'UPDATE_TASK_STARRED_STATUS';
export const GET_TASK_DETAIL = 'GET_TASK_DETAIL';
export const UPDATE_TASK_DETAIL = 'UPDATE_TASK_DETAIL';
export const GET_TODO_STAFF_LIST = 'GET_TODO_STAFF_LIST';

//CONTACT_APP
export const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
export const GET_CONTACT_FOLDER_LIST = 'GET_CONTACT_FOLDER_LIST';
export const GET_CONTACT_LABEL_LIST = 'GET_CONTACT_LABEL_LIST';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT_LABEL = 'UPDATE_CONTACT_LABEL';
export const UPDATE_CONTACT_STARRED_STATUS = 'UPDATE_CONTACT_STARRED_STATUS';
export const GET_CONTACT_DETAIL = 'GET_CONTACT_DETAIL';
export const TOGGLE_CONTACT_DRAWER = 'TOGGLE_CONTACT_DRAWER';
export const UPDATE_CONTACT_DETAIL = 'UPDATE_CONTACT_DETAIL';
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';

//SCRUMBOARD_APP
export const GET_MEMBER_LIST = 'GET_MEMBER_LIST';
export const GET_SCRUM_LABEL_LIST = 'GET_SCRUM_LABEL_LIST';
export const GET_BOARDS = 'GET_BOARDS';
export const GET_BOARD_DETAIL = 'GET_BOARD_DETAIL';
export const ADD_BOARD_LIST = 'ADD_BOARD_LIST';
export const ADD_LIST_CARD = 'ADD_LIST_CARD';
export const EDIT_LIST_CARD = 'EDIT_LIST_CARD';
export const DELETE_LIST_CARD = 'DELETE_LIST_CARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const ADD_NEW_BOARD = 'ADD_NEW_BOARD';
export const DELETE_LIST = 'DELETE_LIST';
export const EDIT_BOARD_DETAIL = 'EDIT_BOARD_DETAIL';
export const EDIT_BOARD_LIST = 'EDIT_BOARD_LIST';

//CHAT_APP
export const GET_CONNECTIONS_LIST = 'get_connections_list';
export const GET_USER_MESSAGES = 'get_user_messages';
export const ADD_NEW_MESSAGE = 'add_new_message';
export const EDIT_MESSAGE = 'edit_message';
export const DELETE_MESSAGE = 'delete_message';
export const DELETE_USER_MESSAGES = 'delete_user_messages';
export const TOGGLE_CHAT_DRAWER = 'toggle_chat_drawer';

//WALL_APP
export const GET_WALL_DATA = 'get_wall_data';
export const GET_FEED_POSTS = 'get_feed_posts';
export const CREATE_NEW_POST = 'create_new_post';
export const UPDATE_POST = 'update_post';

//ECOMMERCE_LIST
export const GET_ECOMMERCE_LIST = 'get_ecommerce_list';
export const SET_PRODUCT_VIEW_TYPE = 'set_product_view_type';
export const SET_FILTER_DATA = 'set_filter_data';
export const SET_PRODUCT_DATA = 'set_product_data';
export const GET_RECENT_ORDER = 'get_recent_order';
export const GET_CUSTOMERS = 'get_customers';
export const ADD_CART_ITEM = 'add_cart_item';
export const REMOVE_CART_ITEM = 'remove_cart_item';
export const UPDATE_CART_ITEM = 'update_cart_item';
export const SET_CART_ITEMS = 'set_cart_items';

//CK-EDITOR
export const GET_BALLOON_BLOCK_DATA = 'get_balloon_block_data';
export const UPDATE_BALLOON_BLOCK_DATA = 'update_balloon_block_data';
export const GET_BALLOON_DATA = 'get_balloon_data';
export const UPDATE_BALLOON_DATA = 'update_balloon_data';
export const GET_CLASSIC_DATA = 'get_classic_data';
export const UPDATE_CLASSIC_DATA = 'update_classic_data';
export const GET_INLINE_DATA = 'get_inline_data';
export const UPDATE_INLINE_DATA = 'update_inline_data';
export const GET_DOCUMENT_DATA = 'get_document_data';
export const UPDATE_DOCUMENT_DATA = 'update_document_data';
export const GET_CUSTOM_DATA = 'get_custom_data';
export const UPDATE_CUSTOM_DATA = 'update_custom_data';

//GALLERY
export const GET_GALLERY_PHOTO = 'GET_GALLERY_PHOTO';

//USER_LIST
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_ALL_USERS_LIST = 'GET_ALL_USERS_LIST';
export const ADD_NEW_USER = 'ADD_NEW_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const AUTH_USER_UPDATE = 'AUTH_USER_UPDATE';
export const INCREMENT_TOTAL_USER = 'INCREMENT_TOTAL_USER';

//ROLE_LIST

export const GET_ROLE_LIST = 'GET_ROLE_LIST';
export const GET_ALL_ROLES_LIST = 'GET_ALL_ROLES_LIST';
export const ADD_NEW_ROLE = 'ADD_NEW_ROLE';
export const UPDATE_ROLE = 'UPDATE_ROLE';

export const GET_PERMISSION_LIST = 'GET_PERMISSION_LIST';
export const GET_ALL_PERMISSION_LIST = 'GET_ALL_PERMISSION_LIST';

//Customer List
export const GET_CUSTOMER_LIST = 'GET_CUSTOMER_LIST';
export const GET_ALL_CUSTOMER_LIST = 'GET_ALL_CUSTOMER_LIST';
export const SET_CUSTOMER_FILTER_DATA = 'SET_CUSTOMER_FILTER_DATA';
export const ADD_NEW_CUSTOMER = 'ADD_NEW_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const INCREMENT_TOTAL_CUSTOMER = 'INCREMENT_TOTAL_CUSTOMER';

//Location List
export const GET_LOCATION_LIST = 'GET_LOCATION_LIST';
export const GET_ALL_LOCATIONS_LIST = 'GET_ALL_LOCATIONS_LIST';
export const INCREMENT_TOTAL_LOCATION = 'INCREMENT_TOTAL_LOCATION';

export const SET_LOCATION_FILTER_DATA = 'SET_LOCATION_FILTER_DATA';
export const ADD_NEW_LOCATION = 'ADD_NEW_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

//Category List
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
export const SET_CATEGORY_FILTER_DATA = 'SET_CATEGORY_FILTER_DATA';
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

//Auction Items
export const GET_AUCTION_ITEMS = 'GET_AUCTION_ITEMS';
export const GET_WEB_AUCTION_ITEMS = 'GET_WEB_AUCTION_ITEMS';
export const SET_AUCTION_VIEW_TYPE = 'SET_AUCTION_VIEW_TYPE';
export const LOADING_VEHICLE = 'LOADING_VEHICLE';
export const INCREMENT_TOTAL_AUCTION = 'INCREMENT_TOTAL_AUCTION';

export const SET_AUCTION_ITEM_VIEW_TYPE = 'SET_AUCTION_ITEM_VIEW_TYPE';
export const SET_AUCTION_ITEM_FILTER_DATA = 'SET_AUCTION_ITEM_FILTER_DATA';
export const SET_AUCTION_ITEM_DATA = 'SET_AUCTION_ITEM_DATA';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UPDATE_AUCTION_ITEM = 'UPDATE_AUCTION_ITEM';

export const GET_AUCTIONS = 'GET_AUCTIONS';
export const SET_AUCTION_FILTER_DATA = 'SET_AUCTION_FILTER_DATA';
export const ADD_NEW_AUCTION = 'ADD_NEW_AUCTION';
export const UPDATE_AUCTION = 'UPDATE_AUCTION';
export const GET_VEHICLE_AUCTIONS = 'GET_VEHICLE_AUCTIONS';

// Web Auction List
export const GET_WEB_AUCTIONS = 'GET_WEB_AUCTIONS';
export const SET_WEB_AUCTION_VIEW_TYPE = 'SET_WEB_AUCTION_VIEW_TYPE';
export const GET_UP_COMING_WEB_AUCTIONS = 'GET_UP_COMING_WEB_AUCTIONS';
export const ADD_TODAY_AUCTION = 'ADD_TODAY_AUCTION';
export const INCREMENT_TOTAL_NEW_AUCTION_ITEM =
  'INCREMENT_TOTAL_NEW_AUCTION_ITEM';
export const ADD_UPCOMING_AUCTION = 'ADD_UPCOMING_AUCTION';
export const INCREMENT_TOTAL_UPCOMING_AUCTION_ITEM =
  'INCREMENT_TOTAL_UPCOMING_AUCTION_ITEM';
export const UPDATE_UPCOMING_AUCTION = 'UPDATE_UPCOMING_AUCTION';
export const UPDATE_TODAY_AUCTION = 'UPDATE_TODAY_AUCTION';

// Vehicles List
export const GET_VEHICLE_LIST = 'GET_VEHICLE_LIST';
export const GET_ALL_VEHICLE_LIST = 'GET_ALL_VEHICLE_LIST';
export const GET_VEHICLE_VIEW = 'GET_VEHICLE_VIEW';
export const SET_VEHICLE_FILTER_DATA = 'SET_VEHICLE_FILTER_DATA';
export const ADD_NEW_VEHICLE = 'ADD_NEW_VEHICLE';
export const UPDATE_VEHICLE = 'UPDATE_VEHICLE';
export const INCREMENT_TOTAL_VEHICLE = 'INCREMENT_TOTAL_VEHICLE';
export const LOADING_ITEM = 'LOADING_ITEM';

// general
export const ADMIN_COUNTS = 'ADMIN_COUNTS';

// Autocomplete
export const GET_USER_AUTOCOMPLETE_OPTIONS = 'GET_USER_AUTOCOMPLETE_OPTIONS';

// Website Vehicles List
export const GET_WEB_VEHICLE_LIST = 'GET_WEB_VEHICLE_LIST';
export const EMPTY_WEB_VEHICLE_LIST = 'EMPTY_WEB_VEHICLE_LIST';
export const GET_WEB_VEHICLE_VIEW = 'GET_WEB_VEHICLE_VIEW';
export const SET_VEHICLE_VIEW_TYPE = 'SET_VEHICLE_VIEW_TYPE';
export const GET_WEB_SIMILAR_VEHICLE = 'GET_WEB_SIMILAR_VEHICLE';
export const SET_VEHICLE_SEARCH = 'SET_VEHICLE_SEARCH';
export const GET_FEATURED_VEHICLE_LIST = 'GET_FEATURED_VEHICLE_LIST';
export const GET_BEST_SELLING_VEHICLE_LIST = 'GET_BEST_SELLING_VEHICLE_LIST';
export const SET_WEB_VEHICLE_FILTER_DATA = 'SET_WEB_VEHICLE_FILTER_DATA';
export const GET_RECENTLY_ADDED_VEHICLE_LIST =
  'GET_RECENTLY_ADDED_VEHICLE_LIST';
export const GET_MY_WATCH_LIST = 'GET_MY_WATCH_LIST';
export const GET_MY_PURCHASE_LIST = 'GET_MY_PURCHASE_LIST';
export const GET_POPULAR_BRANDS_COUNT = 'GET_POPULAR_BRANDS_COUNT';
export const SET_BRAND_FILTER_DATA = 'SET_BRAND_FILTER_DATA';
export const FETCH_VEHICLES_ERROR = 'FETCH_VEHICLES_ERROR';
export const INCREMENT_TOTAL_WEB_VEHICLE = 'INCREMENT_TOTAL_WEB_VEHICLE';
export const ADD_NEW_WEB_VEHICLE = 'ADD_NEW_WEB_VEHICLE';
export const UPDATE_WEB_VEHICLE = 'UPDATE_WEB_VEHICLE';
export const DELETE_REAL_TIME_VEHICLE = 'DELETE_REAL_TIME_VEHICLE';

//Make List
export const GET_MAKE_LIST = 'GET_MAKE_LIST';
export const SET_MAKE_FILTER_DATA = 'SET_MAKE_FILTER_DATA';
export const ADD_NEW_MAKE = 'ADD_NEW_MAKE';
export const UPDATE_MAKE = 'UPDATE_MAKE';

//Model List
export const GET_MODEL_LIST = 'GET_MODEL_LIST';
export const SET_MODEL_FILTER_DATA = 'SET_MODEL_FILTER_DATA';
export const ADD_NEW_MODEL = 'ADD_NEW_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL';

//Sale List
export const GET_SALE_LIST = 'GET_SALE_LIST';
export const ADD_NEW_SALE = 'ADD_NEW_SALE';
export const UPDATE_SALE = 'UPDATE_SALE';
export const SET_AUCTION_DATA = 'SET_AUCTION_DATA';
export const GET_ALL_SALES_LIST = 'GET_ALL_SALES_LIST';
export const INCREMENT_TOTAL_SALE = 'INCREMENT_TOTAL_SALE';
