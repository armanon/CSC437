import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
const credentialSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true
    }
  },
  { collection: "user_credentials" }
);
const credentialModel = model("Credential", credentialSchema);
function create(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject("must provide username and password");
    }
    credentialModel.find({ username }).then((found) => {
      if (found.length) reject("username exists");
    }).then(
      () => bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt)).then((hashedPassword) => {
        const creds = new credentialModel({
          username,
          hashedPassword
        });
        creds.save().then((created) => {
          if (created) resolve(created);
        });
      })
    );
  });
}
function verify(username, password) {
  return new Promise((resolve, reject) => {
    credentialModel.find({ username }).then((found) => {
      if (found && found.length === 1) return found[0];
      else reject("Invalid username or password");
    }).then((credsOnFile) => {
      if (credsOnFile)
        bcrypt.compare(
          password,
          credsOnFile.hashedPassword,
          (_, result) => {
            if (result) resolve(credsOnFile.username);
            else reject("Invalid username or password");
          }
        );
      else reject("Invalid username or password");
    });
  });
}
var credential_svc_default = { create, verify };
export {
  credential_svc_default as default
};
