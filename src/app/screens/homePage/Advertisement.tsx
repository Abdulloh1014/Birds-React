import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Box, Typography } from "@mui/material"; // MUI Material ishlatish yaxshiroq
import { Container } from "@mui/material";

export default function Advertisement() {
    const facts = [
        {
            title: "Birds of Paradise",
            img: "/img/ofparadise.jpg",
            desc: "Famous for extraordinary plumage and elaborate dances. Some species twist and fan their feathers in mesmerizing ways to attract mates."
        },
        {
            title: "Colibri",
            img: "/img/Colibri.jpg",
            desc: "The Sparkling Violet-ear is a vibrant hummingbird that hovers effortlessly while feeding on nectar, helping pollinate flowers."
        },
        {
            title: "Hoopoe",
            img: "/img/Hoopoe.jpg",
            desc: "Known for its distinctive crown of feathers and long, curved bill used to probe the ground for insects. Easily recognizable appearance."
        },
        {
            title: "Peacock",
            img: "/img/peacock.jpeg",
            desc: "Famous for iridescent tail feathers that make up 60% of its body length. Its courtship display is one of nature’s most spectacular shows."
        },
        {
            title: "Victoria Crowned Pigeon",
            img: "/img/victory.jpg",
            desc: "The largest pigeon species in the world, native to New Guinea. Its stunning lacy crest and blue feathers look like bird royalty."
        },
        {
            title: "Scarlet Macaw",
            img: "/img/parrot2.jpg",
            desc: "Highly intelligent large parrot native to Central and South America. Known for vivid colors and ability to mimic human speech."
        }
    ];

    return (      
        <Box className="ads-restaurant-frame" sx={{ py: 10, bgcolor: "#f8faf8" }}>
            <Container sx={{ maxWidth: "1252px !important" }}>
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography 
                        variant="h3" 
                        fontWeight={900} 
                        sx={{ color: "#1b4332", textTransform: "uppercase", letterSpacing: 2 }}
                    >
                        Interesting Facts
                    </Typography>
                    <Box sx={{ width: 80, height: 4, bgcolor: "#40916c", mx: "auto", mt: 2, borderRadius: 2 }} />
                </Box>

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    style={{ paddingBottom: "60px" }}
                >
                    {facts.map((fact, index) => (
                        <SwiperSlide key={index}>
                            <Box sx={{ 
                                bgcolor: "#fff", 
                                borderRadius: "30px", 
                                overflow: "hidden", 
                                height: "550px", // Hamma slaydlar bir xil balandlikda
                                border: "1px solid #eef2ef",
                                transition: "0.3s",
                                "&:hover": { boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }
                            }}>
                                <img 
                                    src={fact.img} 
                                    alt={fact.title} 
                                    style={{ 
                                        width: "100%", 
                                        height: "280px", 
                                        objectFit: "cover" 
                                    }} 
                                />
                                <Box sx={{ p: 3 }}>
                                    <Typography variant="h6" fontWeight={800} sx={{ color: "#1b4332", mb: 1.5 }}>
                                        {fact.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: "#52796f", 
                                            lineHeight: 1.6,
                                            // Matnni bir xil qatorda cheklash uchun:
                                            display: "-webkit-box",
                                            WebkitLineClamp: 5,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {fact.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    );
}