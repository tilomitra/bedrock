import React from "react";
import { Link } from "react-router-dom";

const FooPage = () =>
    <section>
        <h1>FooPage</h1>
        <Link to={"/"}>Go back to Index</Link>
    </section>;

export default FooPage;
