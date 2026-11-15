"""
=============================================================================
SIMOLAT FOOTBALL ACADEMY - INTERACTIVE LOCATION MAP GENERATOR
=============================================================================
This script generates an interactive HTML location map centered on the main
administrative office of Simolat Football Academy at 77 Awolowo Road, Ikoyi SW,
Lagos State, Nigeria (Postcode 101233) with surrounding key landmarks.

Requirements:
    pip install folium

Output:
    academy_location.html
=============================================================================
"""

import folium
from folium import plugins

def generate_academy_map():
    # 1. Exact office coordinates for 77 Awolowo Road, Ikoyi SW, Lagos
    OFFICE_LAT = 6.4474
    OFFICE_LNG = 3.4245

    # 2. Create interactive folium Map centered on office coordinates
    # Default zoom level 16 allows viewers to easily see surrounding main roads & transit points
    m = folium.Map(
        location=[OFFICE_LAT, OFFICE_LNG],
        zoom_start=16,
        tiles="OpenStreetMap",
        control_scale=True,
        prefer_canvas=True
    )

    # 3. Custom HTML Popup for the office marker
    popup_content = """
    <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; min-width: 280px; padding: 4px;">
        <div style="background: #047857; color: #ffffff; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: 800; font-size: 13px;">
            ⚽ Simolat Football Academy
        </div>
        <div style="padding: 12px; background: #ffffff; border: 1px solid #cbd5e1; border-top: none; border-radius: 0 0 6px 6px;">
            <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 4px;">
                Apex Elite Football Academy - Main Office
            </strong>
            <span style="display: inline-block; background: #ecfdf5; color: #047857; font-weight: 800; font-size: 11px; padding: 2px 8px; border-radius: 4px; border: 1px solid #10b981; margin-bottom: 8px;">
                Hours: 9 AM - 5 PM
            </span>
            <div style="font-size: 11px; color: #475569; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 8px;">
                <strong>📍 Main Administrative Office:</strong> 77 Awolowo Road, Ikoyi SW, Lagos State, Nigeria (Postcode: 101233)<br>
                <strong>🏢 Osun State Office:</strong> Ax14a Surulere Street, Isokun Ilesha Osun State, Nigeria. (Postcode: 233282)<br>
                <strong>📞 Contact:</strong> Box Office: +234 805 454 5933 | Scouting Hotline: +234 803 040 1744<br>
                <strong>🏢 Key Landmarks:</strong> Right next to Mobil Filling Station, 2 blocks north of SPAR Market, near Ribadu Junction & YMCA Building
            </div>
        </div>
    </div>
    """

    # 4. Custom marker with dark green color and sports icon, with the exact requested tooltip
    folium.Marker(
        location=[OFFICE_LAT, OFFICE_LNG],
        popup=folium.Popup(popup_content, max_width=320),
        tooltip="Apex Elite Football Academy - Main Office. Hours: 9 AM - 5 PM.",
        icon=folium.Icon(color="darkgreen", icon="futbol", prefix="fa")
    ).add_to(m)

    # 5. Add key landmarks nearby for orientation
    landmarks = [
        {
            "name": "Mobil Filling Station (Right next to office)",
            "lat": 6.4477,
            "lng": 3.4243,
            "color": "blue",
            "icon": "tint"
        },
        {
            "name": "YMCA Building Ikoyi",
            "lat": 6.4485,
            "lng": 3.4250,
            "color": "cadetblue",
            "icon": "university"
        },
        {
            "name": "SPAR Market (2 blocks south)",
            "lat": 6.4442,
            "lng": 3.4230,
            "color": "orange",
            "icon": "shopping-cart"
        },
        {
            "name": "Ribadu Junction / Falomo Bridge",
            "lat": 6.4428,
            "lng": 3.4255,
            "color": "purple",
            "icon": "road"
        }
    ]

    for lm in landmarks:
        folium.Marker(
            location=[lm["lat"], lm["lng"]],
            popup=f"<b style='font-family: sans-serif; font-size: 12px;'>{lm['name']}</b>",
            tooltip=lm["name"],
            icon=folium.Icon(color=lm["color"], icon=lm["icon"], prefix="fa")
        ).add_to(m)

    # 6. Save the map to 'academy_location.html'
    output_filename = "academy_location.html"
    m.save(output_filename)
    print(f"✅ Success! Interactive map saved as '{output_filename}'")
    print(f"📍 Center Coordinates: ({OFFICE_LAT}, {OFFICE_LNG})")
    print(f"🏷️ Tooltip: 'Apex Elite Football Academy - Main Office. Hours: 9 AM - 5 PM.'")
    print(f"🔍 Zoom Level: 16 (Awolowo Rd, Falomo, Ribadu Junction visible)")

if __name__ == "__main__":
    generate_academy_map()
