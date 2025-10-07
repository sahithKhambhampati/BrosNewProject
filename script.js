document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-delivery-btn');
    const pod = document.querySelector('.pod');
    const notification = document.getElementById('notification');
    const floorSelect = document.getElementById('floor-select');
    const conveyorBelt = document.querySelector('.conveyor-belt');

    const floorHeight = 120; // 20% of 600px

    startBtn.addEventListener('click', () => {
        const targetFloor = parseInt(floorSelect.value);

        // Reset pod and floor styles
        pod.style.transition = 'none';
        pod.style.transform = 'translateY(0) translateX(0)';
        document.querySelectorAll('.floor').forEach(floor => floor.classList.remove('active'));

        // Show notification
        showNotification(`Delivery started to ${targetFloor}F...`);

        // Start animation after a short delay
        setTimeout(() => {
            animateDelivery(targetFloor);
        }, 500);
    });

    function animateDelivery(targetFloor) {
        // Animate pod up the elevator
        pod.style.transition = 'transform 4s ease-in-out';
        const verticalDistance = -((targetFloor - 1) * floorHeight + floorHeight / 2);
        pod.style.transform = `translateY(${verticalDistance}px)`;

        // When elevator reaches the floor, animate conveyor
        setTimeout(() => {
            const targetFloorElement = document.querySelector(`.floor[data-floor='${targetFloor}']`);
            targetFloorElement.classList.add('active');

            // Animate conveyor belt
            conveyorBelt.style.transition = 'background-position 3s linear';
            conveyorBelt.style.backgroundPosition = '-200px 0';

            pod.style.transition = 'transform 3s ease-in-out';
            const horizontalDistance = -300; // Move left
            pod.style.transform = `translateY(${verticalDistance}px) translateX(${horizontalDistance}px)`;

            // After delivery, show message and reset
            setTimeout(() => {
                showNotification(`Package delivered to ${targetFloor}F!`);
                targetFloorElement.classList.remove('active');
                conveyorBelt.style.transition = 'none';
                conveyorBelt.style.backgroundPosition = '0 0';
            }, 3000);

        }, 4500);
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3500);
    }
});