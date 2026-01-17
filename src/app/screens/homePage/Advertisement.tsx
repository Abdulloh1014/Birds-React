import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Box } from "@mui/joy";
import { Stack } from "@mui/material";
import { Padding } from "@mui/icons-material";

export default function Advertisement() {
    return (      
        <div className="ads-restaurant-frame">
            {/* Sarlavha qo‘shildi */}

  <Box sx={{ textAlign: "center", width: "100%" }}>
  <Box className="fact-title">Interesting Facts</Box>
</Box>

            
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 4500 }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                style={{paddingInline: "30px", gap: "5px"}}
            >
                <SwiperSlide>
                    <div style={{ textAlign: "center",   }}>
                        <img src="/img/ofparadise.jpg" alt="Event 1" style={{ width: "100%", height: "370px", objectFit: "cover", borderRadius: "23px" }} />
                        <h3>Birds of Paradise</h3>
                        <p>Birds of Paradise are famous for their extraordinary
                              plumage and elaborate courtship dances. Some species
                              can twist, fan, and display their feathers in mesmerizing 
                              ways to attract mates, making them one of nature’s most 
                              spectacular showmen.
                              </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ textAlign: "center" }}>
                        <img src="/img/Colibri.jpg" alt="Event 1" style={{ width: "100%", height: "370px", objectFit: "cover", borderRadius: "23px" }} />
                        <h3>Colibri</h3>
                        <p>The Sparkling Violet-ear (Colibri coruscans) is a small, 
                            vibrant hummingbird known for its striking violet ear patches. 
                            It hovers effortlessly while feeding on nectar, 
                            helping pollinate flowers, and its dazzling colors make it a 
                            true delight to watch in the wild.
                            </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ textAlign: "center" }}>
                        <img src="/img/Hoopoe.jpg" alt="Event 1" style={{ width: "100%", height: "370px", objectFit: "cover", borderRadius: "23px" }} />
                        <h3>Hoopoe</h3>
                        <p>The Hoopoe is known for its distinctive crown of 
                            feathers and long, curved bill. It uses its bill 
                            to probe the ground for insects, and its striking 
                            appearance makes it easily recognizable.
                            </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ textAlign: "center" }}>
                        <img src="/img/peacock.jpeg" alt="Event 1" style={{ width: "100%", height: "370px", objectFit: "cover", borderRadius: "23px" }} />
                        <h3>Peacock</h3>
                        <p>The peacock is famous for its iridescent tail feathers 
                            that it fans out to attract mates. These feathers can 
                            be more than 60% of its total body length, making 
                            its courtship display one of nature’s most spectacular shows.
                            </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ textAlign: "center" }}>
                        <img src="/img/victory.jpg" alt="Event 1" style={{ width: "100%", height: "370px", objectFit: "cover", borderRadius: "23px" }} />
                        <h3>Victoria Crowned Pigeon</h3>
                        <p>The Victoria Crowned Pigeon is the largest pigeon species 
                            in the world, native to New Guinea. Its stunning lacy 
                            crest and deep blue feathers make it look like a bird 
                            royalty, and it moves gracefully on the forest floor.
                            </p>
                    </div>
                </SwiperSlide>
                 <SwiperSlide>
                    <div style={{ textAlign: "center" }}>
                        <img src="/img/parrot2.jpg" alt="Event 1" style={{ width: "100%", height: "370px", objectFit: "cover", borderRadius: "23px" }} />
                        <h3>Scarlet Macaw</h3>
                        <p>The Scarlet Macaw is a large, brightly colored parrot 
                            native to Central and South America. Known for its vivid 
                            red, yellow, and blue feathers, it is highly intelligent 
                            and can mimic human speech, making it a favorite among bird enthusiasts.
                            </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
