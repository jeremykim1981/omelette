const axios = require("axios");
const AWS = require("aws-sdk");

var poolData = {
  UserPoolId: "ap-southeast-1_Xl71jonfo",
  ClientId: "56ctle5lljo0dnkf7ndj3so5uh",
};

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const getFormInput = (userAttributes, providerType) => {
  const sameInput = {
    username: userAttributes.userName,
    email: userAttributes.email,
    first_name: userAttributes["custom:first_name"],
    last_name: userAttributes["custom:last_name"],
    coin: 0,
  };
  // if (providerType === "Google") {
  //   return {
  //     ...sameInput,
  //     name: userAttributes.name,
  //     first_name: userAttributes["custom:first_name"],
  //     last_name: userAttributes["custom:last_name"],
  //   };
  // } else {
  return {
    ...sameInput,
    phone_number: userAttributes["custom:fixed_phone_number"],
  };
  // }
};

exports.handler = async (event, context, callback) => {
  try {
    if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
      const userAttributes = {
        ...event.request.userAttributes,
        userName: event.userName,
        identities: { providerType: "" },
      };
      const providerType = userAttributes?.identities?.providerType;
      const formInput = getFormInput(userAttributes, providerType);
      const { data: responseData } = await axios.post(
        "https://aixmlhnsui.execute-api.ap-southeast-1.amazonaws.com/production/profiles",
        formInput
      );
      const paramsUpdateId = {
        UserAttributes: [
          {
            Name: "custom:id",
            Value: responseData.data._id,
          },
        ],
        UserPoolId: poolData.UserPoolId,
        Username: event.userName,
      };
      await cognitoidentityserviceprovider
        .adminUpdateUserAttributes(paramsUpdateId)
        .promise();
    }
    callback(null, event);
  } catch (error) {}
};
