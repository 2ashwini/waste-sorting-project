"""
Comprehensive waste information database.
Contains detailed information about waste types including safety, storage, disposal, and environmental impact.
"""

WASTE_DATABASE = {
    'Organic': {
        'name': 'Organic Waste',
        'examples': ['Food scraps', 'Fruit peels', 'Vegetable waste', 'Garden waste', 'Coffee grounds', 'Tea bags'],
        'risk_level': 'Low',
        'risk_reason': 'Generally safe but can attract pests and produce odors if not managed properly',
        'storage': {
            'instructions': [
                'Store in sealed, ventilated containers to prevent odor buildup',
                'Keep in a cool, dry place away from direct sunlight',
                'Use biodegradable bags or newspaper lining',
                'Empty containers every 2-3 days to prevent decomposition odors',
                'Keep separate from recyclables and dry waste'
            ],
            'container_type': 'Green bin with lid, compost bin, or sealed bucket'
        },
        'sanitization': {
            'steps': [
                '1. Wear disposable gloves before handling',
                '2. Remove any non-organic materials (plastic, metal)',
                '3. Rinse containers with water after emptying',
                '4. Disinfect bins weekly with diluted bleach solution (1:10 ratio)',
                '5. Dry containers completely before reuse',
                '6. Wash hands thoroughly with soap after handling'
            ],
            'equipment': ['Disposable gloves', 'Disinfectant/bleach', 'Water', 'Scrub brush']
        },
        'disposal': {
            'methods': [
                'Compost in backyard composting bin',
                'Use municipal organic waste collection services',
                'Create vermicompost using earthworms',
                'Use as mulch for garden plants (dried leaves, grass)',
                'Community composting programs'
            ],
            'locations': 'Green waste bins, composting facilities, municipal collection points',
            'frequency': 'Daily or every 2-3 days'
        },
        'monitoring': {
            'checks': [
                'Monitor for foul odors (indicates decomposition)',
                'Check for pest infestation (flies, rodents)',
                'Inspect for leakage or moisture buildup',
                'Ensure no contamination with non-organic materials'
            ],
            'safety': [
                'Avoid touching decomposed waste with bare hands',
                'Keep away from food preparation areas',
                'Ensure proper ventilation in storage area',
                'Clean spills immediately to prevent bacterial growth'
            ]
        },
        'tools_required': ['Compost bin', 'Biodegradable bags', 'Gloves', 'Sealed containers', 'Garden fork (for composting)'],
        'environmental_impact': {
            'proper_disposal': [
                'Reduces methane emissions from landfills by 50-70%',
                'Creates nutrient-rich compost for soil enrichment',
                'Reduces need for chemical fertilizers',
                'Supports circular economy and sustainability',
                'Decreases landfill burden'
            ],
            'improper_disposal': [
                'Produces methane (potent greenhouse gas) in landfills',
                'Attracts pests and disease vectors',
                'Contaminates recyclable materials',
                'Wastes valuable nutrients that could enrich soil',
                'Increases landfill volume unnecessarily'
            ]
        },
        'pros_cons': {
            'pros': [
                'Easy to compost at home',
                'Free natural fertilizer production',
                'Reduces household waste by 30-40%',
                'Improves soil health and plant growth',
                'Low cost and simple process'
            ],
            'cons': [
                'Can produce odors if not managed properly',
                'May attract pests if exposed',
                'Requires regular maintenance',
                'Takes time to decompose (2-6 months)',
                'Needs dedicated space for composting'
            ]
        }
    },
    
    'Recyclable': {
        'name': 'Recyclable Waste',
        'examples': ['Plastic bottles', 'Paper', 'Cardboard', 'Glass bottles', 'Aluminum cans', 'Metal containers'],
        'risk_level': 'Low',
        'risk_reason': 'Safe to handle when clean; contaminated recyclables may harbor bacteria',
        'storage': {
            'instructions': [
                'Clean and dry all items before storage',
                'Remove caps, lids, and labels when possible',
                'Flatten cardboard boxes to save space',
                'Store in dry area to prevent mold growth',
                'Separate by material type (paper, plastic, glass, metal)',
                'Keep away from organic waste to avoid contamination'
            ],
            'container_type': 'Blue recycling bin or separate bins for each material type'
        },
        'sanitization': {
            'steps': [
                '1. Rinse containers with water to remove food residue',
                '2. Remove labels and stickers when possible',
                '3. Dry items completely before placing in recycling bin',
                '4. Crush cans and bottles to save space',
                '5. For greasy items (pizza boxes), remove contaminated portions',
                '6. Wash recycling bins monthly with soap and water'
            ],
            'equipment': ['Water', 'Mild soap', 'Scrub brush', 'Drying rack or towel']
        },
        'disposal': {
            'methods': [
                'Place in designated recycling bins (blue bins)',
                'Take to local recycling centers or drop-off points',
                'Participate in municipal curbside recycling programs',
                'Return bottles/cans to stores with deposit programs',
                'Donate clean items to recycling cooperatives'
            ],
            'locations': 'Recycling centers, curbside pickup, retail drop-off points, scrap dealers',
            'frequency': 'Weekly or bi-weekly as per municipal schedule'
        },
        'monitoring': {
            'checks': [
                'Ensure items are clean and dry',
                'Check for contamination (food, liquids)',
                'Verify items are actually recyclable in your area',
                'Monitor bin capacity to avoid overflow'
            ],
            'safety': [
                'Wear gloves when handling broken glass',
                'Be careful with sharp edges on metal cans',
                'Avoid recycling items with chemical residue',
                'Keep bins covered to prevent pest access'
            ]
        },
        'tools_required': ['Recycling bins (separate for different materials)', 'Gloves', 'Can crusher (optional)', 'Labels for sorting'],
        'environmental_impact': {
            'proper_disposal': [
                'Saves 60% energy compared to producing from raw materials',
                'Reduces greenhouse gas emissions significantly',
                'Conserves natural resources (trees, minerals, oil)',
                'Reduces landfill waste by up to 75%',
                'Creates jobs in recycling industry',
                'One ton of recycled plastic saves 5,774 kWh of energy'
            ],
            'improper_disposal': [
                'Wastes valuable raw materials',
                'Increases landfill burden (plastic takes 500+ years to decompose)',
                'Contributes to ocean plastic pollution',
                'Increases carbon footprint from new production',
                'Contaminates soil and water with microplastics'
            ]
        },
        'pros_cons': {
            'pros': [
                'Significantly reduces environmental impact',
                'Conserves natural resources',
                'Creates economic value from waste',
                'Reduces energy consumption in manufacturing',
                'Simple and widely available programs'
            ],
            'cons': [
                'Requires cleaning before recycling',
                'Not all plastics are recyclable',
                'Contamination can ruin entire batches',
                'Recycling facilities not available everywhere',
                'Some items require special handling'
            ]
        }
    },
    
    'Hazardous': {
        'name': 'Hazardous Waste',
        'examples': ['Batteries', 'Paint', 'Chemicals', 'Pesticides', 'Motor oil', 'Expired medicines', 'Cleaning products'],
        'risk_level': 'High',
        'risk_reason': 'Can cause serious health issues, fires, explosions, or environmental contamination',
        'storage': {
            'instructions': [
                '⚠️ CRITICAL: Store in original labeled containers',
                'Keep in locked cabinet away from children and pets',
                'Store in cool, dry, well-ventilated area',
                'Keep incompatible chemicals separate (acids away from bases)',
                'Place containers in secondary containment (tray/bin)',
                'Never store near food, water, or heat sources',
                'Keep fire extinguisher nearby for flammable materials'
            ],
            'container_type': 'Original containers with intact labels, placed in leak-proof secondary containers'
        },
        'sanitization': {
            'steps': [
                '1. ⚠️ ALWAYS wear protective equipment (gloves, goggles, mask)',
                '2. Work in well-ventilated area or outdoors',
                '3. DO NOT mix different hazardous materials',
                '4. DO NOT pour down drains or toilets',
                '5. Wipe spills immediately with absorbent material',
                '6. Dispose of cleaning materials as hazardous waste',
                '7. Wash hands and exposed skin thoroughly after handling',
                '8. Remove contaminated clothing and wash separately'
            ],
            'equipment': ['Heavy-duty gloves', 'Safety goggles', 'Face mask/respirator', 'Protective clothing', 'Absorbent materials', 'Spill kit']
        },
        'disposal': {
            'methods': [
                '⚠️ Take to designated hazardous waste collection centers',
                'Use pharmacy take-back programs for medicines',
                'Contact local waste management for scheduled pickup',
                'Participate in community hazardous waste collection days',
                'NEVER dispose in regular trash, drains, or environment'
            ],
            'locations': 'Hazardous waste facilities, pharmacies (for medicines), automotive shops (for oil), designated collection events',
            'frequency': 'As soon as possible; do not accumulate'
        },
        'monitoring': {
            'checks': [
                '⚠️ Daily inspection for leaks or container damage',
                'Check for unusual odors or fumes',
                'Monitor expiration dates',
                'Ensure labels remain intact and readable',
                'Check for corrosion or container degradation'
            ],
            'safety': [
                '⚠️ NEVER touch with bare hands',
                'Ensure proper ventilation at all times',
                'Keep away from ignition sources',
                'Have emergency contact numbers readily available',
                'Know first aid procedures for exposure',
                'Keep Material Safety Data Sheets (MSDS) accessible'
            ]
        },
        'tools_required': ['Protective gloves', 'Safety goggles', 'Respirator mask', 'Leak-proof containers', 'Absorbent pads', 'Warning labels', 'Spill kit'],
        'environmental_impact': {
            'proper_disposal': [
                'Prevents soil and groundwater contamination',
                'Protects human health and wildlife',
                'Allows for safe treatment and neutralization',
                'Enables recovery of valuable materials',
                'Prevents fires and explosions at landfills'
            ],
            'improper_disposal': [
                '⚠️ SEVERE: Contaminates soil and water for decades',
                'One liter of oil can pollute 1 million liters of water',
                'Causes serious health issues (cancer, organ damage)',
                'Harms wildlife and ecosystems',
                'Creates fire and explosion hazards',
                'Violates environmental laws (legal penalties)'
            ]
        },
        'pros_cons': {
            'pros': [
                'Protects public health and environment',
                'Prevents catastrophic contamination',
                'Enables safe material recovery',
                'Complies with legal requirements',
                'Reduces long-term cleanup costs'
            ],
            'cons': [
                'Requires special handling and expertise',
                'Collection facilities may be far away',
                'May involve disposal fees',
                'Requires careful storage and transport',
                'Time-consuming proper disposal process'
            ]
        }
    },
    
    'E-Waste': {
        'name': 'Electronic Waste (E-Waste)',
        'examples': ['Old phones', 'Computers', 'Laptops', 'Chargers', 'Printers', 'Circuit boards', 'LED bulbs', 'Batteries'],
        'risk_level': 'Medium to High',
        'risk_reason': 'Contains toxic materials (lead, mercury) and can cause electric shock; fire hazard if damaged',
        'storage': {
            'instructions': [
                'Remove batteries and store separately',
                'Cover exposed circuits with insulated plastic or tape',
                'Store in dry area to prevent corrosion',
                'Keep away from moisture and heat sources',
                'Stack carefully to prevent damage',
                'Store in anti-static bags if available',
                'Keep cords wrapped and secured'
            ],
            'container_type': 'Cardboard boxes or plastic bins with padding, anti-static bags for sensitive components'
        },
        'sanitization': {
            'steps': [
                '1. ⚠️ CRITICAL: Wipe all personal data from devices',
                '2. Perform factory reset on phones/computers',
                '3. Remove SIM cards and memory cards',
                '4. Wear gloves to avoid cuts from broken glass/metal',
                '5. Clean exterior with dry cloth (do not use water on electronics)',
                '6. Remove batteries and store separately',
                '7. Discharge capacitors in old devices (consult expert)',
                '8. DO NOT dismantle devices yourself'
            ],
            'equipment': ['Gloves', 'Anti-static wrist strap', 'Screwdrivers (for battery removal)', 'Dry cleaning cloth', 'Insulating tape']
        },
        'disposal': {
            'methods': [
                'Take to certified e-waste recycling centers',
                'Use manufacturer take-back programs (Apple, Samsung, etc.)',
                'Donate working electronics to charities or schools',
                'Participate in e-waste collection drives',
                'Return to electronics retailers with recycling programs',
                'Contact authorized e-waste collectors'
            ],
            'locations': 'E-waste recycling centers, manufacturer stores, electronics retailers, municipal collection points',
            'frequency': 'As devices become obsolete; do not hoard'
        },
        'monitoring': {
            'checks': [
                'Check for battery swelling or leakage',
                'Monitor for burning smell or heat',
                'Inspect for exposed wires or circuits',
                'Ensure devices are powered off',
                'Check for corrosion or rust'
            ],
            'safety': [
                '⚠️ Risk of electric shock from capacitors',
                'Wear insulated gloves when handling',
                'Do not burn or incinerate e-waste',
                'Keep away from children',
                'Avoid breaking screens (toxic materials)',
                'Do not expose to water or moisture'
            ]
        },
        'tools_required': ['Insulated gloves', 'Anti-static bags', 'Screwdrivers', 'Insulating tape', 'Padded storage boxes', 'Data wiping software'],
        'environmental_impact': {
            'proper_disposal': [
                'Recovers 95% of valuable materials (gold, silver, copper)',
                'Prevents toxic materials from entering landfills',
                'Reduces mining for rare earth elements',
                'Saves energy (recycling uses 2-10x less energy)',
                'Creates jobs in recycling sector',
                'Prevents soil and water contamination'
            ],
            'improper_disposal': [
                '⚠️ Releases lead, mercury, and cadmium into environment',
                'Contaminates soil and groundwater for generations',
                'Causes serious health issues (neurological damage)',
                'Wastes valuable rare earth elements',
                'Contributes to illegal e-waste dumping in developing countries',
                'Fire hazard in landfills from lithium batteries'
            ]
        },
        'pros_cons': {
            'pros': [
                'Recovers valuable precious metals',
                'Prevents environmental contamination',
                'Supports circular economy',
                'Enables donation of working devices',
                'Protects personal data through proper wiping'
            ],
            'cons': [
                'Requires data wiping (time-consuming)',
                'Certified recyclers may be far away',
                'Some devices have residual value (hard to let go)',
                'Improper recycling can expose workers to toxins',
                'Not all components are recyclable'
            ]
        }
    },
    
    'Dry Waste': {
        'name': 'Dry Waste (Non-Recyclable)',
        'examples': ['Diapers', 'Napkins', 'Tissues', 'Styrofoam', 'Rubber', 'Leather', 'Cloth', 'Ceramics', 'Wrappers'],
        'risk_level': 'Low to Medium',
        'risk_reason': 'Generally safe but may contain contaminants; some items pose hygiene risks',
        'storage': {
            'instructions': [
                'Ensure items are completely dry',
                'Store in sealed bags or bins',
                'Keep separate from wet/organic waste',
                'Wrap sharp objects (broken ceramics) in newspaper',
                'Store sanitary waste in separate sealed bags',
                'Keep in covered bins to prevent pest access'
            ],
            'container_type': 'Black/gray bins with lids, sealed plastic bags'
        },
        'sanitization': {
            'steps': [
                '1. Wear gloves when handling sanitary or contaminated items',
                '2. Wrap used diapers/sanitary items in newspaper or bags',
                '3. Compress items to reduce volume',
                '4. Seal bags tightly before disposal',
                '5. Clean bins weekly with disinfectant',
                '6. Wash hands thoroughly after handling',
                '7. Dispose of contaminated gloves properly'
            ],
            'equipment': ['Disposable gloves', 'Plastic bags', 'Disinfectant', 'Newspaper for wrapping']
        },
        'disposal': {
            'methods': [
                'Place in designated dry waste bins',
                'Use municipal solid waste collection services',
                'Consider upcycling or creative reuse when possible',
                'Donate usable cloth/leather items to thrift stores',
                'Some items (styrofoam) may have special recycling programs'
            ],
            'locations': 'Dry waste bins, landfills, waste-to-energy plants, municipal collection points',
            'frequency': 'Daily or every 2-3 days'
        },
        'monitoring': {
            'checks': [
                'Ensure waste is completely dry',
                'Check for contamination with wet waste',
                'Monitor for odors (indicates organic contamination)',
                'Inspect for pest infestation',
                'Verify sharp objects are wrapped safely'
            ],
            'safety': [
                'Wear gloves for sanitary waste',
                'Wrap sharp objects to prevent injuries',
                'Keep sanitary waste separate',
                'Avoid compressing sharp or hard objects',
                'Ensure proper hygiene after handling'
            ]
        },
        'tools_required': ['Sealed bins', 'Plastic bags', 'Gloves', 'Newspaper', 'Disinfectant'],
        'environmental_impact': {
            'proper_disposal': [
                'Proper segregation enables waste-to-energy conversion',
                'Reduces contamination of recyclables',
                'Minimizes landfill space usage through compaction',
                'Some items can be upcycled or repurposed',
                'Prevents spread of disease from sanitary waste'
            ],
            'improper_disposal': [
                'Takes 20-200 years to decompose in landfills',
                'Styrofoam never fully decomposes',
                'Contaminates recyclable materials',
                'Increases landfill burden by 40% if not segregated',
                'Sanitary waste spreads disease if exposed',
                'Microplastics from synthetic materials pollute soil'
            ]
        },
        'pros_cons': {
            'pros': [
                'Simple disposal process',
                'No special handling required (except sanitary items)',
                'Can be compressed to save space',
                'Some items can be creatively reused',
                'Regular municipal collection available'
            ],
            'cons': [
                'Most items are not recyclable',
                'Long decomposition time in landfills',
                'Limited environmental benefits',
                'Contributes to landfill volume',
                'Sanitary items pose hygiene risks'
            ]
        }
    }
}
