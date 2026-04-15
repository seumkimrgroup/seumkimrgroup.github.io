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
    title: "Low-voltage polymer-stabilized liquid crystals enabled by phase separation between liquid crystals and blends of mesogenic and non-mesogenic monomers",
    source: "Journal of Molecular Liquids",
    detail: "433, 127952",
    year: 2025,
    authors: "HJ Jang, YI Lee, HS Hwang, S Lee, K Won, SU Kim",
    type: "sci",
    link: ""
  },
  {
    title: "Broadband near-infrared reflective film from stacked opposite-handed chiral liquid crystals with pitch gradients",
    source: "Crystals",
    detail: "15(7), 597",
    year: 2025,
    authors: "HS Hwang, J Lee, B Kang, M Kim, D Kim, SU Kim",
    type: "sci",
    link: ""
  },
  {
    title: "Numerical analysis for cost-effective temperature reduction in high-power light-emitting diodes using thermal via array",
    source: "Applied Sciences",
    detail: "15(12), 6505",
    year: 2025,
    authors: "YJ Hwang, BY Lee, MJ Kim, SC Park, K Won, SU Kim",
    type: "sci",
    link: ""
  },
  {
    title: "Tomographic strain indicator of chiral liquid crystalline elastomer",
    source: "Chemical Engineering Journal",
    detail: "513, 163040",
    year: 2025,
    authors: "HJ Lee, SU Kim, HS Oh, SM Park, J Hyun, YS Kim, DS Kim",
    type: "sci",
    link: ""
  },
  {
    title: "Flexible phototransistors integrated with chiral liquid crystal encapsulating film for improving color selectivity and stability",
    source: "ACS Applied Electronic Materials",
    detail: "6(11), 8094-8103",
    year: 2024,
    authors: "JH Choi, HS Hwang, HB Jang, SU Kim, HL Park",
    type: "sci",
    link: ""
  },
  {
    title: "Elastomer film of high-density porosity for efficient light scattering",
    source: "Polymer (Korea)",
    detail: "48(2), 165-170",
    year: 2024,
    authors: "H Jeong, S Lee, H Bae, B Choi, HS Hwang, SU Kim",
    type: "non-sci",
    link: ""
  },
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
    title: "Recent Progress in Liquid Crystal-Based Smart Windows",
    source: "Journal of Flexible and Printed Electronics",
    detail: "2(1), 61-76",
    year: 2023,
    authors: "HS Hwang, HM Cho, SU Kim",
    type: "non-sci",
    link: ""
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
    title: "Helical photonic crystal-based reflective-type color display and method for manufacturing the same",
    source: "US Patent",
    detail: "10,877,311",
    year: 2020,
    authors: "Sin-Doo Lee, Se-Um Kim",
    type: "patent",
    link: ""
  },
  {
    title: "Light-modulated quantum dot color display and method for manufacturing the same",
    source: "US Patent",
    detail: "10,503,015",
    year: 2019,
    authors: "Sin-Doo Lee, Se-Um Kim, Jeng-Hun Suh",
    type: "patent",
    link: ""
  },
  {
    title: "Programming emergent symmetries with saddle-splay elasticity",
    source: "Nature Communications",
    detail: "10, 5104",
    year: 2019,
    authors: "Yu Xia*, Andrew A. DeBenedictis*, Dae Seok Kim, Shenglan Chen, Se-Um Kim, Douglas J. Cleaver+, Timothy J. Atherton+, Shu Yang+",
    type: "sci",
    link: "https://www.nature.com/articles/s41467-019-13012-9"
  },
  {
    title: "Selective photonic printing based on anisotropic Fabry-Perot resonators for dual-image holography and anti-counterfeiting",
    source: "Optics Express",
    detail: "27(17), 24512-24523",
    year: 2019,
    authors: "In-Ho Lee, Gang Li, Bo-Yeon Lee, Se-Um Kim, Byoungho Lee, Sang-Hyun Oh, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-27-17-24512"
  },
  {
    title: "Concept of chiral image storage and selection based on liquid crystals by circular polarization",
    source: "Optics Express",
    detail: "27(8), 11661-11672",
    year: 2019,
    authors: "Sang Hyun Lee, Sin-Hyung Lee, Se-Um Kim, Sujie Kang, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-27-8-11661"
  },
  {
    title: "Self-organized wrinkling of liquid crystalline polymer with plasma treatment",
    source: "Journal of Materials Research",
    detail: "33(23), 4092-4100",
    year: 2018,
    authors: "Jaehyun Sim, Sihwa Oh, Se-Um Kim, Kyuyoung Heo, Seung-Chul Park, Jun-Hee Na",
    type: "sci",
    link: "https://link.springer.com/article/10.1557/jmr.2018.360"
  },
  {
    title: "Transparent and flexible high power triboelectric nanogenerator with metallic nanowire-embedded tribonegative conducting polymer",
    source: "Nano Energy",
    detail: "53, 152-159",
    year: 2018,
    authors: "Bo-Yeon Lee, Se-Um Kim, Sujie Kang, Sin-Doo Lee",
    type: "sci",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S2211285518306116?via%3Dihub"
  },
  {
    title: "Topographic localization of liquid crystals based on gradual phase separation in a polymer network for electrically tunable smart window applications",
    source: "Journal of Information Display",
    detail: "19(4), 151-157",
    year: 2018,
    authors: "Se-Um Kim*, Sang Hyun Lee*, Jaehyun Sim, Sin-Doo Lee, Jun-Hee Na",
    type: "non-sci",
    link: "https://www.tandfonline.com/doi/full/10.1080/15980316.2018.1520158"
  },
  {
    title: "Generation of intensity-tunable structural color from helical photonic crystals for full color reflective-type display",
    source: "Optics Express",
    detail: "26(10), 13561-13572",
    year: 2018,
    authors: "Se-Um Kim, Sin-Hyung Lee, In-Ho Lee, Bo-Yeon Lee, Jun-Hee Na, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-26-10-13561"
  },
  {
    title: "Design and fabrication of liquid crystal-based lenses",
    source: "Liquid Crystals",
    detail: "44(12-13), 2121-2132",
    year: 2017,
    authors: "Se-Um Kim, Jun-Hee Na, Chiwoo Kim, Sin-Doo Lee",
    type: "sci",
    link: "https://www.tandfonline.com/doi/full/10.1080/02678292.2017.1328748"
  },
  {
    title: "Reduction of gamma distortions in liquid crystal display by anisotropic voltage-dividing layer of reactive mesogens",
    source: "Liquid Crystals",
    detail: "44(2), 364-371",
    year: 2017,
    authors: "Se-Um Kim, Bo-Yeon Lee, Jeng-Hun Suh, Jiyoon Kim, Jun-Hee Na, Sin-Doo Lee",
    type: "sci",
    link: "https://www.tandfonline.com/doi/full/10.1080/02678292.2016.1205224"
  },
  {
    title: "Concept of active parallax barrier on polarizing interlayer for near-viewing autostereoscopic displays",
    source: "Optics Express",
    detail: "24(22), 25010-25018",
    year: 2016,
    authors: "Se-Um Kim, Jiyoon Kim, Jeng-Hun Suh, Jun-Hee Na, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-24-22-25010"
  },
  {
    title: "The domain mixing effect on the electro-optical properties of liquid crystals using polyimide doped with reactive mesogen",
    source: "Journal of Information Display",
    detail: "17(3), 125-130",
    year: 2016,
    authors: "Eui-Sang Yu, Se-Um Kim, Jeng-Hun Suh, Jiyoon Kim, Jun-Hee Na, Sin-Doo Lee",
    type: "non-sci",
    link: "https://www.tandfonline.com/doi/full/10.1080/15980316.2016.1208631"
  },
  {
    title: "Importance of surface modification of a microcontact stamp for pattern fidelity of soluble organic semiconductors",
    source: "Journal of Micro/Nanolithography, MEMS, and MOEMS",
    detail: "15(1), 13501",
    year: 2016,
    authors: "Hea-Lim Park, Bo-Yeon Lee, Se-Um Kim, Jeng-Hun Suh, Min-Hoi Kim, Sin-Doo Lee",
    type: "sci",
    link: "https://www.spiedigitallibrary.org/journals/journal-of-micro-nanolithography-mems-and-moems/volume-15/issue-1/013501/Importance-of-surface-modification-of-a-microcontact-stamp-for-pattern/10.1117/1.JMM.15.1.013501.short"
  },
  {
    title: "Optically switchable grating based on dye-doped ferroelectric liquid crystal with high efficiency",
    source: "Optics Express",
    detail: "23(10), 12619-12627",
    year: 2015,
    authors: "Jiyoon Kim, Jeng-Hun Suh, Bo-Yeon Lee, Se-Um Kim, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-23-10-12619"
  },
  {
    title: "Self-organized wrinkling patterns of a liquid crystalline polymer in surface wetting confinement",
    source: "Soft Matter",
    detail: "11(24), 4788-4792",
    year: 2015,
    authors: "Jun-Hee Na, Se-Um Kim, Youngjoo Sohn, Sin-Doo Lee",
    type: "sci",
    link: "https://pubs.rsc.org/en/content/articlelanding/2015/sm/c5sm00694e"
  },
  {
    title: "Colloidal assembling template with wrinkled patterns based on liquid crystalline polymer",
    source: "Molecular Crystals and Liquid Crystals",
    detail: "610(1), 221-226",
    year: 2015,
    authors: "Se-Um Kim, Jiyoon Kim, Eui-Sang Yu, In-Ho Lee, Bo-Yeon Lee, Youngjoo Sohn, Sin-Doo Lee",
    type: "sci",
    link: "https://www.tandfonline.com/doi/full/10.1080/15421406.2015.1026749"
  },
  {
    title: "Lenticular lens array based on liquid crystal with a polarization-dependent focusing effect for 2D–3D image applications",
    source: "Journal of Information Display",
    detail: "16(1), 11-15",
    year: 2015,
    authors: "Jiyoon Kim, Se-Um Kim, Bo-Yeon Lee, Jeng-Hun Suh, Sin-Doo Lee",
    type: "non-sci",
    link: "https://www.tandfonline.com/doi/full/10.1080/15980316.2015.1010615"
  },
  {
    title: "Combinatorial color arrays based on optical micro-resonators in monolithic architecture",
    source: "Optics Express",
    detail: "22(12), 15320-15327",
    year: 2014,
    authors: "In-Ho Lee, Sin-Hyung Lee, Chang-Min Keum, Se-Um Kim, Sin-Doo Lee",
    type: "sci",
    link: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-22-12-15320"
  },
  {
    title: "Precise lens-on-lens architecture using selective wettability for image-depth representation",
    source: "Molecular Crystals and Liquid Crystals",
    detail: "591(1), 50-54",
    year: 2014,
    authors: "Se-Um Kim, Jiyoon Kim, Sin-Doo Lee",
    type: "sci",
    link: "https://www.tandfonline.com/doi/abs/10.1080/15421406.2014.917781"
  },
  {
    title: "Tunable liquid crystal lens array by encapsulation with a photo-reactive polymer for short focal length",
    source: "Optics Communications",
    detail: "313, 329-332",
    year: 2014,
    authors: "Se-Um Kim, Sanghun Lee, Jun-Hee Na, Sin-Doo Lee",
    type: "sci",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0030401813009814?via%3Dihub"
  },
  {
    title: "Array of solid-state dye-sensitized solar cells with micropatterned TiO2 nanoparticles for a high-voltage power source",
    source: "Nanoscale Research Letters",
    detail: "8(1), 491",
    year: 2013,
    authors: "Seong-Min Cho, Hea-Lim Park, Min-Hoi Kim, Se-Um Kim, Sin-Doo Lee",
    type: "sci",
    link: "https://link.springer.com/article/10.1186/1556-276X-8-491"
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
