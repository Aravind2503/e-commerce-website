import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function RegisterPage(props) {
    return (
        <div>
            <Navbar searchBar={false} />
            <div class="container border border-dark border-4 p-5 mt-4">
                <form>
                    <div class="mb-3">
                        <label for="username" class="form-label">
                            Username :
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="userid" class="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            class="form-control"
                            id="userid"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="userage" class="form-label">
                            Age :
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="userage"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="userpassword" class="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            class="form-control"
                            id="userpassword"
                            required
                        />
                    </div>
                    <div class="mb-3 form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="rememberuser"
                        />
                        <label class="form-check-label" for="rememberuser">
                            Remember me
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            <div className="text-center">
                Already A User ?<Link to="/login"> Login</Link>
            </div>
        </div>
    );
}
