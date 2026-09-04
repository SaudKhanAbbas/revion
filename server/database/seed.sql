-- Revion PostgreSQL Seed Data
-- Realistic Motorcycle Service Categories and Guides

INSERT INTO categories (name, description) VALUES
('Engine & Transmission', 'Core engine maintenance, oil changes, and valvetrain servicing'),
('Drivetrain & Wheels', 'Chain tension, sprockets, tyres, and wheel alignment'),
('Brakes & Safety', 'Brake pads, fluid lines, discs, and safety inspection'),
('Electrical & Battery', 'Battery voltage, spark plugs, lighting, and wiring checks'),
('Fluids & Filters', 'Engine coolant, air filters, fuel filters, and fork oil')
ON CONFLICT (name) DO NOTHING;

INSERT INTO service_guides (category_id, title, interval_km, estimated_cost, description) VALUES
((SELECT id FROM categories WHERE name = 'Engine & Transmission'), 'Engine Oil & Filter Change', 3000, 1200.00, 'Replace engine oil with manufacturer recommended grade and install new oil filter to ensure internal engine lubrication.'),
((SELECT id FROM categories WHERE name = 'Engine & Transmission'), 'Spark Plug Inspection & Replacement', 10000, 450.00, 'Inspect spark plug electrode gap and replace if fouled or worn to maintain optimal combustion efficiency.'),
((SELECT id FROM categories WHERE name = 'Engine & Transmission'), 'Valve Clearance Inspection', 12000, 1500.00, 'Measure and adjust intake and exhaust valve clearances to prevent valve burn and maintain engine power.'),

((SELECT id FROM categories WHERE name = 'Drivetrain & Wheels'), 'Drive Chain Clean & Lubrication', 500, 300.00, 'Clean drive chain using dedicated degreaser and apply high-viscosity chain lube to prevent premature wear.'),
((SELECT id FROM categories WHERE name = 'Drivetrain & Wheels'), 'Chain Slack Adjustment & Alignment', 2000, 250.00, 'Check chain free-play (typically 25-35mm) and align rear wheel axle using swingarm alignment marks.'),
((SELECT id FROM categories WHERE name = 'Drivetrain & Wheels'), 'Tyre Pressure & Tread Depth Check', 1000, 100.00, 'Inspect cold tyre pressures against spec and check tread depth for safe wet traction.'),

((SELECT id FROM categories WHERE name = 'Brakes & Safety'), 'Brake Pad Inspection & Replacement', 6000, 950.00, 'Check friction material thickness on front and rear brake pads. Replace if below 2mm minimum safety threshold.'),
((SELECT id FROM categories WHERE name = 'Brakes & Safety'), 'Brake Fluid Flush & Bleed', 10000, 600.00, 'Flush old DOT 4 brake fluid and purge air bubbles from hydraulic brake lines for firm lever feel.'),

((SELECT id FROM categories WHERE name = 'Electrical & Battery'), 'Battery Terminal & Voltage Test', 4000, 200.00, 'Test resting battery voltage (>= 12.6V) and clean terminal corrosion with anti-corrosion grease.'),
((SELECT id FROM categories WHERE name = 'Electrical & Battery'), 'Lighting & Switch Harness Test', 2000, 150.00, 'Verify operation of high/low beam headlights, brake lights, indicators, horn, and kill switch.'),

((SELECT id FROM categories WHERE name = 'Fluids & Filters'), 'Air Filter Cleaning & Replacement', 5000, 400.00, 'Clean or replace foam/paper air filter element to prevent dust ingress and maintain fuel economy.'),
((SELECT id FROM categories WHERE name = 'Fluids & Filters'), 'Coolant Flush & Radiator Check', 8000, 750.00, 'Inspect radiator fins, hoses, and replace engine coolant to prevent overheating under load.')
ON CONFLICT (category_id, title) DO NOTHING;
