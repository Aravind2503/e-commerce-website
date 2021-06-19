import Button from "./Button";

export default function LoginPage(props) {
  return (
    <div class="container border border-dark border-4 p-5">
      <form>
        <div class="mb-3">
          <label for="userid" class="form-label">
            Email address
          </label>
          <input type="email" class="form-control" id="userid" />
        </div>
        <div class="mb-3">
          <label for="userpassword" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" id="userpassword" />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="rememberuser" />
          <label class="form-check-label" for="rememberuser">
            Remember me
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
