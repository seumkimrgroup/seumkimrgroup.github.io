/* format
{
  title: "",
  source: "",     // 저널명 / 특허 패밀리 / arXiv 등
  detail: "",     // 권(호), 페이지, 번호 등
  year: 2026,
  authors: "",
  type: "",       // "sci" | "non-sci" | "patent"
  link: "",
}
*/

const publications = [
  {
    title: "Electrostatically powered multimode liquid crystalline elastomer actuators",
    source: "ACS Applied Materials & Interfaces",
    detail: "15(48), 56285-56292",
    year: 2023,
    authors: "Mohsin Hassan Saeed*, Moon-Young Choi*, Kitae Kim, Jin-Hyeong Lee, Keumbee Kim, Dowon Kim, Se-Um Kim, Hyun Kim, Suk-kyun Ahn, Ruochen Lan+, Jun-Hee Na+",
    type: "sci",
    link: "https://pubs.acs.org/doi/full/10.1021/acsami.3c13140"
  },
  {
    title: "Voxelated opto-physically unclonable functions via irreplicable wrinkles",
    source: "Light: Science & Applications",
    detail: "12(1), 245",
    year: 2023,
    authors: "Kitae Kim, Se-Um Kim, Moon-Young Choi, Mohsin Hassan Saeed, Youngmin Kim, Jun-Hee Na",
    type: "sci",
    link: "https://www.nature.com/articles/s41377-023-01285-1"
  },
  {
    title: "2D Arrays of soft actuators performing out-of-plane local inflation for shape displays",
    source: "Advanced Engineering Materials",
    detail: "25(17), 2300267",
    year: 2023,
    authors: "Moon-Young Choi*, Se-Um Kim*, Hogyeong Kim, Kitae Kim, Mohsin Hassan Saeed, Srinivas Pagidi, Jun-Hee Na",
    type: "sci",
    link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/adem.202300267"
  },
  {
    title: "Deformable photonic crystals based on chiral liquid crystals with thermal-mediative shape memory effect",
    source: "Materials",
    detail: "16(1), 35",
    year: 2023,
    authors: "Min-Seok Park*, Kitae Kim*, Young-Joo Lee, Jun-Hee Na, Se-Um Kim",
    type: "sci",
    link: "https://www.mdpi.com/1996-1944/16/1/35"
  },
  {
    title: "Versatile mechanochromic sensor based on highly stretchable chiral liquid crystalline elastomer",
    source: "Small",
    detail: "19(7), 2206299",
    year: 2022,
    authors: "Woong Chan Han*, Young-Joo Lee*, Se-Um Kim*, Hye Joo Lee, Young-Seok Kim+, Dae Seok Kim+",
    type: "sci",
    link: "https://onlinelibrary.wiley.com/doi/10.1002/smll.202206299"
  },
  {
    title: "Reverse-engineered highly conformable leak and pressure reducing cushion for neonatal resuscitation mask",
    source: "Advanced Materials Technologies",
    detail: "7(7), 2101364",
    year: 2022,
    authors: "Carolyn M. McGann*, Young-Joo Lee*, Se-Um Kim*, Danielle D. Weinberg*, Xincheng Zha, Matthew Huber, Michael W. Hast, Kayley Dear, Vinay Nadkarni, Elizabeth E. Foglia+, Shu Yang+",
    type: "sci",
    link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/admt.202101364"
  },
  {
    title: "Broadband and pixelated camouflage in inflating chiral nematic liquid crystalline elastomers",
    source: "Nature Materials",
    detail: "21, 41-46",
    year: 2022,
    authors: "Se-Um Kim, Young-Joo Lee, Jiaqi Liu, Dae Seok Kim, Haihuan Wang, Shu Yang",
    type: "sci",
    link: "https://www.nature.com/articles/s41563-021-01075-3"
  },
  {
    title: "Fabrication of transmittance tunable porous elastomers for smart window applications",
    source: "Polymers Korea",
    detail: "45(6), 934-939",
    year: 2021,
    authors: "Mira Shin*, Youngeun Lee*, Jinkyung Kim*, Gun Woo Sim*, Youngho Eom, Se-Um Kim+, Dae Seok Kim+",
    type: "sci",
    link: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10667018"
  },
  {
    title: "Printable nanocomposite metalens for high-contrast near-infrared imaging",
    source: "ACS Nano",
    detail: "15(1), 698-706",
    year: 2021,
    authors: "Gwanho Yoon*, Kwan Kim*, Se-Um Kim, Seunghoon Han, Heon Lee+, Junsuk Rho+",
    type: "sci",
    link: "https://pubs.acs.org/doi/10.1021/acsnano.0c06968"
  },
  {
    title: "Self-regulating contact lenses with the patterning of a photochromic layer based on wettability contrast",
    source: "Advanced Materials Interfaces",
    detail: "8(2), 2001443",
    year: 2020,
    authors: "Se-Um Kim, Sang Hyun Lee, Kitae Kim, Jun-Hee Na",
    type: "sci",
    link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/admi.202001443"
  },
  {
    title: "High-definition optophysical image construction using mosaics of pixelated wrinkles",
    source: "Advanced Science",
    detail: "7(24), 2002134",
    year: 2020,
    authors: "Kitae Kim*, Se-Um Kim*, Subi Choi, Kyuyoung Heo, Suk-kyun Ahn, Jun-Hee Na",
    type: "sci",
    link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202002134"
  },
  {
    title: "Continuum soft actuators based on reprogrammable geometric constraints",
    source: "Extreme Mechanics Letters",
    detail: "36, 100649",
    year: 2020,
    authors: "Sihwa Oh*, Se-Um Kim*, Sooyoung Yeom, Hogyeong Kim, Sunwoo Kim, Jun-Hee Na",
    type: "sci",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S2352431620300249?via%3Dihub"
  },
  {
    title: "Physical mechanism for flat-to-lenticular lens conversion in homogeneous liquid crystal cell with periodically undulated electrode",
    source: "Optics Express",
    detail: "20(2), 864-869",
    year: 2012,
    authors: "Jun-Hee Na, Seung Chul Park, Se-Um Kim, Yoonseuk Choi, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-20-2-864"
  }
];

/*


Programming emergent symmetries with saddle-splay elasticity
Nature Communications 10, 5104 (2019)

Yu Xia*, Andrew A. DeBenedictis*, Dae Seok Kim, Shenglan Chen, Se-Um Kim, Douglas J. Cleaver+, Timothy J. Atherton+, Shu Yang+

Selective photonic printing based on anisotropic Fabry-Perot resonators for dual-image holography and anti-counterfeiting
Optics Express 27(17), 24512-24523 (2019)

In-Ho Lee, Gang Li, Bo-Yeon Lee, Se-Um Kim, Byoungho Lee, Sang-Hyun Oh, Sin-Doo Lee

Concept of chiral image storage and selection based on liquid crystals by circular polarization
Optics Express 27(8), 11661-11672 (2019)

Sang Hyun Lee, Sin-Hyung Lee, Se-Um Kim, Sujie Kang, Sin-Doo Lee

Self-organized wrinkling of liquid crystalline polymer with plasma treatment
Journal of Materials Research 33(23), 4092-4100 (2018)

Jaehyun Sim, Sihwa Oh, Se-Um Kim, Kyuyoung Heo, Seung-Chul Park, Jun-Hee Na

Transparent and flexible high power triboelectric nanogenerator with metallic nanowire-embedded tribonegative conducting polymer
Nano Energy 53, 152-159 (2018)

Bo-Yeon Lee, Se-Um Kim, Sujie Kang, Sin-Doo Lee

Topographic localization of liquid crystals based on gradual phase separation in a polymer network for electrically tunable smart window applications
Journal of Information Display 19(4), 151-157 (2018)

Se-Um Kim*, Sang Hyun Lee*, Jaehyun Sim, Sin-Doo Lee, Jun-Hee Na

Generation of intensity-tunable structural color from helical photonic crystals for full color reflective-type display
Optics Express 26(10), 13561-13572 (2018)

Se-Um Kim, Sin-Hyung Lee, In-Ho Lee, Bo-Yeon Lee, Jun-Hee Na, Sin-Doo Lee

Design and fabrication of liquid crystal-based lenses
Liquid Crystals 44(12-13), 2121-2132 (2017)

Se-Um Kim, Jun-Hee Na, Chiwoo Kim, Sin-Doo Lee

Reduction of gamma distortions in liquid crystal display by anisotropic voltage-dividing layer of reactive mesogens
Liquid Crystals 44(2), 364-371 (2017)

Se-Um Kim, Bo-Yeon Lee, Jeng-Hun Suh, Jiyoon Kim, Jun-Hee Na, Sin-Doo Lee

Concept of active parallax barrier on polarizing interlayer for near-viewing autostereoscopic displays
Optics Express 24(22), 25010-25018 (2016)

Se-Um Kim, Jiyoon Kim, Jeng-Hun Suh, Jun-Hee Na, Sin-Doo Lee

The domain mixing effect on the electro-optical properties of liquid crystals using polyimide doped with reactive mesogen
Journal of Information Display 17(3), 125-130 (2016)

Eui-Sang Yu, Se-Um Kim, Jeng-Hun Suh, Jiyoon Kim, Jun-Hee Na, Sin-Doo Lee

Importance of surface modification of a microcontact stamp for pattern fidelity of soluble organic semiconductors
Journal of Micro/Nanolithography, MEMS, and MOEMS 15(1), 13501 (2016)

Hea-Lim Park, Bo-Yeon Lee, Se-Um Kim, Jeng-Hun Suh, Min-Hoi Kim, Sin-Doo Lee

Optically switchable grating based on dye-doped ferroelectric liquid crystal with high efficiency
Optics Express 23(10), 12619-12627 (2015)

Jiyoon Kim, Jeng-Hun Suh, Bo-Yeon Lee, Se-Um Kim, Sin-Doo Lee

Self-organized wrinkling patterns of a liquid crystalline polymer in surface wetting confinement
Soft Matter 11(24), 4788-4792 (2015)

Jun-Hee Na, Se-Um Kim, Youngjoo Sohn, Sin-Doo Lee

Colloidal assembling template with wrinkled patterns based on liquid crystalline polymer
Molecular Crystals and Liquid Crystals 610(1), 221-226 (2015)

Se-Um Kim, Jiyoon Kim, Eui-Sang Yu, In-Ho Lee, Bo-Yeon Lee, Youngjoo Sohn, Sin-Doo Lee

Lenticular lens array based on liquid crystal with a polarization-dependent focusing effect for 2D–3D image applications
Journal of Information Display 16(1), 11-15 (2015)

Jiyoon Kim, Se-Um Kim, Bo-Yeon Lee, Jeng-Hun Suh, Sin-Doo Lee

Combinatorial color arrays based on optical micro-resonators in monolithic architecture
Optics Express 22(12), 15320-15327 (2014)

In-Ho Lee, Sin-Hyung Lee, Chang-Min Keum, Se-Um Kim, Sin-Doo Lee

Precise lens-on-lens architecture using selective wettability for image-depth representation
Molecular Crystals and Liquid Crystals 591(1), 50-54 (2014)

Se-Um Kim, Jiyoon Kim, Sin-Doo Lee

Tunable liquid crystal lens array by encapsulation with a photo-reactive polymer for short focal length
Optics Communications 313, 329-332 (2014)

Se-Um Kim, Sanghun Lee, Jun-Hee Na, Sin-Doo Lee

Array of solid-state dye-sensitized solar cells with micropatterned TiO2 nanoparticles for a high-voltage power source

Nanoscale Research Letters 8(1), 491 (2013)

Seong-Min Cho, Hea-Lim Park, Min-Hoi Kim, Se-Um Kim, Sin-Doo Lee

*/
