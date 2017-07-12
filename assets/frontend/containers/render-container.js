import React, { Component } from "react";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import { Page, Card, Button } from "@shopify/polaris";
import "@shopify/polaris/styles.css";

//Bulma Components
import Header from "../components/templates/bulma/header";

// Press Kitty Components
import Mission from "../components/templates/components/mission";
import About from "../components/templates/components/about";
import Milestone from "../components/templates/components/milestone";
import Achievement from "../components/templates/components/achievement";
import Gallery from "../components/templates/components/gallery";
import Team from "../components/templates/components/team";

const shopOrigin = "https://miller-furniture.myshopify.com";
const apiKey = "96a20082ac88cea68e1fa828b673a681";
const secret = "43c92a66f5a5f02efbdead64b384c084";

class RenderContainer extends Component {
    render() {
        return (
            <EmbeddedApp shopOrigin={shopOrigin} apiKey={apiKey} debug={true}>
                <section className="container pk-wrapper">
                    <Page title="Example application">
                        <Card sectioned />
                    </Page>
                    <h3>Rendered</h3>
                    <Mission
                        title={"Hello. We are Miller."}
                        subtitle={"To go where no man has been before."}
                    />

                    <Header title="About Us" />

                    <About
                        content={`
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel velit ut ligula scelerisque porta vel non felis. Donec tincidunt risus at purus tincidunt, vitae bibendum augue ultrices. Proin pulvinar velit a ligula molestie cursus sed non est. Phasellus at hendrerit dui, sit amet blandit ligula. Proin volutpat interdum elit in malesuada. Proin lorem augue, lobortis vitae quam a, mollis imperdiet ex. Vestibulum nec rhoncus tellus. Praesent hendrerit commodo ultricies.
                        </p>
                        <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel velit ut ligula scelerisque porta vel non felis.</blockquote>
                    `}
                    />

                    <Header title="Milestones" />
                    <div className="columns is-multiline">
                        <Milestone
                            amount={10000}
                            type={"count"}
                            description={"customers served"}
                            includePlus={true}
                        />
                        <Milestone
                            amount={4000}
                            type={"count"}
                            description={"trees planted"}
                            includePlus={true}
                        />
                        <Milestone
                            amount={4}
                            type={"stars"}
                            description={"rating from customers"}
                            includePlus={false}
                        />
                    </div>

                    <Header title="Featured Images" />
                    <Gallery
                        images={[
                            {
                                imageUrl:
                                    "https://images.unsplash.com/photo-1497888329096-51c27beff665?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=",
                                caption: "Food on table"
                            },
                            {
                                imageUrl:
                                    "https://images.unsplash.com/photo-1491961865842-98f7befd1a60?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=",
                                caption: "Bowl"
                            },
                            {
                                imageUrl:
                                    "https://images.unsplash.com/photo-1446645681877-acde17e336a9?dpr=2&auto=compress,format&fit=crop&w=376&h=212&q=80&cs=tinysrgb&crop="
                            },
                            {
                                imageUrl:
                                    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop="
                            }
                        ]}
                    />

                    <Header title="Media Coverage" />
                    <div className="columns is-multiline">
                        <Achievement
                            name={"July Issue of Conde Nast"}
                            type={"feature"}
                            imageUrl={
                                "https://newrelic.cdn.prismic.io/newrelic/ab47e19505d25275bd7747399cef98abdd40a7ef_conde-nast.png"
                            }
                            publicationName={"Conde Nast"}
                            publishLink={"http://www.condenast.com"}
                        />
                        <Achievement
                            name={"10 Best Products from Spring"}
                            type={"post"}
                            publicationName={"BlogTO"}
                            publishLink={"http://www.condenast.com"}
                        />
                        <Achievement
                            name={"10 Best Products from Spring"}
                            type={"award"}
                            publicationName={"BlogTO"}
                            imageUrl={
                                "https://static.wixstatic.com/media/5e9385_8ad26cfddc9e483b8f200078be3502ee.jpg"
                            }
                        />
                    </div>

                    <Header title="Team" />
                    <div className="columns">
                        <div className="column is-3">
                            <Team
                                name={"Elizabeth Mendoza"}
                                imageUrl={
                                    "https://images.unsplash.com/photo-1476493359718-5890a93e596c?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop="
                                }
                                description={"Founder and CEO"}
                            />
                        </div>
                        <div className="column is-3">
                            <Team
                                name={"John Smith"}
                                imageUrl={
                                    "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop="
                                }
                                description={"Chief Designer"}
                            />
                        </div>
                        <div className="column is-3">
                            <Team
                                name={"Jose Zuniga"}
                                imageUrl={
                                    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?dpr=2&auto=compress,format&fit=crop&w=376&h=257&q=80&cs=tinysrgb&crop="
                                }
                                description={"Customer Support"}
                            />
                        </div>
                    </div>
                </section>
            </EmbeddedApp>
        );
    }
}

export default RenderContainer;
