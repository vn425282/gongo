import './Home.css'
const Home = () => {
  return (
    <>
      <section className="section">
          <div className="swiper-form-wrap">
            <div className="swiper-container swiper-slider swiper-slider_height-1 swiper-align-left swiper-align-left-custom context-dark bg-gray-darker swiper-container-horizontal swiper-container-fade" data-loop="false" style={{
    backgroundImage: "url(images/banner.jpg)"}} data-autoplay="5500" data-simulate-touch="false" data-slide-effect="fade">
              <div className="swiper-wrapper" style={{height: "860px"}}>
                <div className="swiper-slide swiper-slide-active" style={{background: "rgba(0, 0, 0, 0.6)"}} data-slide-bg="images/swiper-slide-1.jpg" >
                  <div className="swiper-slide-caption">
                    <div className="container container-bigger swiper-main-section">
                      <div className="row row-fix justify-content-sm-center justify-content-md-start">
                        <div className="col-md-6 col-lg-5 col-xl-4 col-xxl-5">
                          <h3>Hundreds of Amazing Destinations</h3>
                          <div className="divider divider-decorate"></div>
                          <p className="text-spacing-sm">We offer a variety of destinations to travel to, ranging from exotic to some extreme ones. They include very popular countries and cities like Paris, Rio de Janeiro, Cairo and a lot of others.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination-wrap">
                <div className="container container-bigger">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"><span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span><span className="swiper-pagination-bullet"></span><span className="swiper-pagination-bullet"></span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container container-bigger form-request-wrap form-request-wrap-modern">
              <div className="row row-fix justify-content-sm-center justify-content-lg-end">
                <div className="col-lg-6 col-xxl-5">
                  <div className="form-request form-request-modern bg-gray-lighter novi-background">
                    <h4>Find your VISA Services</h4>
                    <form className="rd-mailform form-fix" novalidate="novalidate">
                      <div className="row row-20 row-fix">
                        <div className="col-sm-12">
                          <label className="form-label-outside">From</label>
                          <div className="form-wrap form-wrap-inline">
                            <select className="form-input select-filter select2-hidden-accessible" data-placeholder="All" data-minimum-results-for-search="Infinity" name="city" tabindex="-1" aria-hidden="true">
                              <option value="1">New York</option>
                              <option value="2">Lisbon</option>
                              <option value="3">Stockholm</option>
                            </select><span className="select2 select2-container select2-container--bootstrap" dir="ltr" style={{width: "496px"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-city-lk-container"><span className="select2-selection__rendered" id="select2-city-lk-container" title="New York">New York</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label className="form-label-outside">To</label>
                          <div className="form-wrap form-wrap-inline">
                            <select className="form-input select-filter select2-hidden-accessible" data-placeholder="All" data-minimum-results-for-search="Infinity" name="city" tabindex="-1" aria-hidden="true">
                              <option value="1">Chicago</option>
                              <option value="2">Madrid</option>
                              <option value="3">Paris</option>
                            </select><span className="select2 select2-container select2-container--bootstrap" dir="ltr" style={{width: "496px"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-city-fn-container"><span className="select2-selection__rendered" id="select2-city-fn-container" title="Chicago">Chicago</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                          <label className="form-label-outside">Depart Date</label>
                          <div className="form-wrap form-wrap-validation">
                            <input className="form-input" id="dateForm" name="date" type="text" data-time-picker="date" data-dtp="dtp_pQIv5" />
                            <label className="form-label rd-input-label" for="dateForm">Choose the date</label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                          <label className="form-label-outside">Duration</label>
                          <div className="form-wrap form-wrap-validation">
                            <select className="form-input select-filter select2-hidden-accessible" data-placeholder="All" data-minimum-results-for-search="Infinity" name="city" tabindex="-1" aria-hidden="true">
                              <option value="1">Any length</option>
                              <option value="2">2 days</option>
                              <option value="3">3 days</option>
                              <option value="4">4 days</option>
                            </select><span className="select2 select2-container select2-container--bootstrap" dir="ltr" style={{width: "233px"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-city-yl-container"><span className="select2-selection__rendered" id="select2-city-yl-container" title="Any length">Any length</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label-outside">Adults</label>
                          <div className="form-wrap form-wrap-modern">
                            <div className="stepper "><input className="form-input input-append stepper-input" id="form-element-stepper" type="number" min="0" max="300" value="2" /><span className="stepper-arrow up"></span><span className="stepper-arrow down"></span></div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label-outside">Children</label>
                          <div className="form-wrap form-wrap-modern">
                            <div className="stepper "><input className="form-input input-append stepper-input" id="form-element-stepper-1" type="number" min="0" max="300" value="0" /><span className="stepper-arrow up"></span><span className="stepper-arrow down"></span></div>
                          </div>
                        </div>
                      </div>
                      <div className="form-wrap form-button">
                        <button className="button button-block button-secondary" type="submit">Search VISA</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="section section-lg bg-gray-lighter novi-background bg-cover text-center">
        <div className="container container-wide">
          <h3>our services</h3>
          <div className="divider divider-decorate"></div>
          <div className="row row-50 justify-content-sm-center text-left">
            <div className="col-sm-10 col-md-6 col-xl-3">
              <article className="box-minimal box-minimal-border">
                <div className="box-minimal-icon novi-icon mdi mdi-airplane"></div>
                <p className="big box-minimal-title">VISA + Air Tickets</p>
                <hr />
                <div className="box-minimal-text text-spacing-sm">At our travel agency, you can book air tickets to any world destination. We also provide online ticket booking via our website in just a couple of steps.</div>
              </article>
            </div>
            <div className="col-sm-10 col-md-6 col-xl-3">
              <article className="box-minimal box-minimal-border">
                <div className="box-minimal-icon novi-icon mdi mdi-map"></div>
                <p className="big box-minimal-title">Voyages &amp; Cruises</p>
                <hr />
                <div className="box-minimal-text text-spacing-sm">Besides regular tours and excursions, we also offer a variety of cruises &amp; sea voyages for different customers looking for awesome experiences.</div>
              </article>
            </div>
            <div className="col-sm-10 col-md-6 col-xl-3">
              <article className="box-minimal box-minimal-border">
                <div className="box-minimal-icon novi-icon mdi mdi-city"></div>
                <p className="big box-minimal-title">Hotel Bookings</p>
                <hr />
                <div className="box-minimal-text text-spacing-sm">We offer a wide selection of hotel ranging from 5-star ones to small properties located worldwide so that you could book a hotel you like.</div>
              </article>
            </div>
            <div className="col-sm-10 col-md-6 col-xl-3">
              <article className="box-minimal box-minimal-border">
                <div className="box-minimal-icon novi-icon mdi mdi-beach"></div>
                <p className="big box-minimal-title">Tailored Summer Tours</p>
                <hr />
                <div className="box-minimal-text text-spacing-sm">Our agency provides varied tours including tailored summer tours for clients who are searching for an exclusive and memorable vacation.</div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-md text-center text-md-left bg-gray-700 novi-background bg-cover">
        <div className="container container-wide">
          <div className="row row-fix row-50 justify-content-sm-center">
            <div className="col-xxl-8">
              <div className="box-cta box-cta-inline">
                <div className="box-cta-inner">
                  <h3 className="box-cta-title">Vietnam VISA without waiting</h3>
                  <p>Using our website, you can book any tour just in a couple of clicks.</p>
                </div>
                <div className="box-cta-inner"><a className="button button-secondary button-nina" href="#">Book Now</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Home;