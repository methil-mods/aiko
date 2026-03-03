import * as THREE from 'three'

export class AikoEnvironment {
    private scene: THREE.Scene
    private grid: THREE.GridHelper | null = null
    private ground: THREE.Mesh | null = null

    constructor(scene: THREE.Scene, isDebug: boolean = false) {
        this.scene = scene
        this.init(isDebug)
    }

    private init(isDebug: boolean) {
        // Load background
        const loader = new THREE.TextureLoader()
        loader.load('/aikobase/stream_bg.webp', (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            this.scene.background = texture
        })

        if (isDebug) {
            // Add helpers for debug mode
            this.grid = new THREE.GridHelper(20, 20, 0x444444, 0x222222)
            this.grid.position.y = -0.05
            // Put on debug layer (1)
            this.grid.layers.set(1)
            this.scene.add(this.grid)

            const groundGeo = new THREE.PlaneGeometry(30, 30)
            const groundMat = new THREE.MeshStandardMaterial({
                color: 0x111111,
                roughness: 0.9,
                metalness: 0.1,
                transparent: true,
                opacity: 0.3
            })
            this.ground = new THREE.Mesh(groundGeo, groundMat)
            this.ground.rotation.x = -Math.PI / 2
            this.ground.position.y = -0.1
            this.ground.layers.set(1)
            this.scene.add(this.ground)
        }
    }

    public setGridVisible(visible: boolean) {
        if (this.grid) this.grid.visible = visible
    }

    public destroy() {
        if (this.scene.background instanceof THREE.Texture) {
            this.scene.background.dispose()
        }
        this.scene.background = null

        if (this.grid) {
            this.grid.geometry.dispose()
            if (this.grid.material instanceof THREE.Material) this.grid.material.dispose()
            this.scene.remove(this.grid)
        }

        if (this.ground) {
            this.ground.geometry.dispose()
            if (this.ground.material instanceof THREE.Material) this.ground.material.dispose()
            this.scene.remove(this.ground)
        }
    }
}
