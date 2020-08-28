window.flowFacebookData = {
  appId: "",
  clientToken: "",
  loginSuccessFunc: () => {},
  loginFailFunc: () => {},
};
export async function performGetOperation(url, headers) {
  const res = await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: headers,
  }).catch(function (error) {
    throw new Error("full-flow-facebook : " + error.message);
  });

  return await res.json();
}

// getAppToken
export async function getAppToken() {
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${window.flowFacebookData.appId}&client_secret=${window.flowFacebookData.clientToken}&grant_type=client_credentials`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// getMyInstagramAccMediaStats
export async function getMyInstagramAccMediaStats(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/media?fields=shortcode,caption,comments_count,thumbnail_url,username,media_type,media_url,like_count,comments,is_comment_enabled&limit=10&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}
// getMyInstagramAccInsight
export async function getMyInstagramAccInsight(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}
// getMyInstagramAccInfo
export async function getMyInstagramAccInfo(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=biography,followers_count,follows_count,ig_id,name,profile_picture_url&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// getMyInstagramAccInfo
export async function getMyInstagramNormalAccInfo(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=follow_count,has_profile_picture,media_count,username,profile_pic&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// getMyFbInstaBusinessAcc
export async function getMyFbInstaBusinessAcc(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=instagram_business_account&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// getMyfbAcc
export async function getMyfbAccInfo(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/me?fields=id,name,email&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}
// getMyfbAcc
export async function getMyfbAccPage(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/me/accounts?fields=name,id,access_token,instagram_business_account{id}&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// getMyInsight
export async function getMyInsight(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// getInstgramProfile
export async function getInstgramProfile(instagramProfileId) {
  FB.api(`${instagramProfileId}`, function (responseData) {
    if (responseData && !responseData.error) {
      return responseData;
    }
  });
}
// getMyInfo
export async function getMyInfo(instagramProfileId) {
  FB.api("/me", function (responseData) {
    console.log("getMyInfo", responseData);
    const instaUserId = responseData.id;
    return responseData;
  });
}

// doLoginSuccessWithCallBack
export async function doLoginSuccessWithCallBack(yourCallBackFunc) {
  const instaUserId = responseData.authResponse.userID;
  const accessToken = responseData.authResponse.accessToken;
  return yourCallBackFunc && yourCallBackFunc(instaUserId, accessToken);
}

export function checkLoginState(yourCallBackFunc) {
  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      return yourCallBackFunc && yourCallBackFunc(response);
    }
  });
}

export async function doLoginFail(responseData) {
  // throw new Error("Flow failed Fail" + responseData.status);
  return window.flowFacebookData.loginFailFunc(responseData);
}
export async function doLoginSuccess(responseData) {
  const userIdResponse = responseData.authResponse.userID;
  const accessTokenResponse = responseData.authResponse.accessToken;
  return window.flowFacebookData.loginSuccessFunc({
    userIdInfo: userIdResponse,
    accessTokenInfo: accessTokenResponse,
  });
}
export function doLogin() {
  FB.login(
    function (response) {
      if (response.status === "connected") {
        // Logged into your webpage and Facebook.
        return doLoginSuccess(response);
        // console.log("response", response);
      }
      return doLoginFail(response);
    },
    { scope: "email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement" }
  );
}
export function initializeFlow() {
  initializeFbScripts();
}

export function initializeFbScripts() {
  // initalize ------------------->
  window.fbAsyncInit = function () {
    FB.init({
      appId: window.flowFacebookData.appId,
      cookie: true,
      xfbml: true,
      version: "v8.0",
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
  // <------------------- initalize
}
