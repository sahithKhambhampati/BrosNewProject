import os
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the index.html file
        current_dir = os.getcwd()
        file_path = os.path.join(current_dir, 'index.html')

        # Use a 'file://' URL to open the local HTML file
        page.goto(f'file://{file_path}')

        # Select the 3rd floor
        page.select_option('select#floor-select', '3')

        # Click the start button
        page.click('button#start-delivery-btn')

        # Wait for the pod to move to the final position
        # We expect the pod to have a specific transform style after all animations
        pod = page.locator('.pod')
        # Wait for the vertical and horizontal movement to complete.
        # Vertical: -((3 - 1) * 120 + 120 / 2) = -300px
        # Horizontal: -300px
        # A bit of a hack, but we can wait for the final notification to be sure.
        notification = page.locator('#notification')
        expect(notification).to_have_text('Package delivered to 3F!', timeout=10000)
        expect(notification).to_be_visible()

        # Take a screenshot
        screenshot_path = 'jules-scratch/verification/verification.png'
        page.screenshot(path=screenshot_path)

        browser.close()

if __name__ == "__main__":
    run()