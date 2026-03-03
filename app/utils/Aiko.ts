import * as THREE from 'three'

export class Aiko {
    public mesh: THREE.Mesh | null = null
    public shadow: THREE.Mesh | null = null
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private onLoaded: () => void

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, onLoaded: () => void) {
        this.scene = scene
        this.camera = camera
        this.onLoaded = onLoaded
        this.init()
    }

    private init() {
        const loader = new THREE.TextureLoader()

        const onLoad = (texture: THREE.Texture) => {
            console.log('[Aiko] texture loaded successfully')
            // Enable pixel-perfect rendering (disable linear filtering)
            texture.magFilter = THREE.NearestFilter
            texture.minFilter = THREE.NearestFilter
            texture.colorSpace = THREE.SRGBColorSpace

            // Calculate height to fit perfectly
            const vFOV = (this.camera.fov * Math.PI) / 180
            const visibleHeight = 2 * Math.tan(vFOV / 2) * this.camera.position.z

            const zoomFactor = 1.1
            const meshSize = visibleHeight * zoomFactor

            const geometry = new THREE.PlaneGeometry(meshSize * 1.55, meshSize)
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                fog: false
            })
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.position.y = 1.0
            this.scene.add(this.mesh)

            this.onLoaded()
        }

        const onError = (err: any) => {
            console.error('[Aiko] failed to load texture:', err)
            // Still call onLoaded to avoid blocking the UI forever
            this.onLoaded()
        }

        loader.load('/aikobase/stream_ame_comic_000.png', onLoad, undefined, onError)
    }

    public update(time: number) {
        if (!this.mesh) return

        // Subtle rotation
        this.mesh.rotation.y = Math.sin(time * 0.3) * 0.04
    }

    public handleResize() {
        if (!this.mesh) return
        const vFOV = (this.camera.fov * Math.PI) / 180
        const visibleHeight = 2 * Math.tan(vFOV / 2) * this.camera.position.z
        const meshSize = visibleHeight * 1.1

        // Dispose old geometry
        this.mesh.geometry.dispose()
        this.mesh.geometry = new THREE.PlaneGeometry(meshSize * 1.55, meshSize)
    }

    public destroy() {
        if (this.mesh) {
            this.mesh.geometry.dispose()
            if (this.mesh.material instanceof THREE.Material) {
                this.mesh.material.dispose()
            }
            if (this.mesh.material instanceof THREE.MeshBasicMaterial && this.mesh.material.map) {
                this.mesh.material.map.dispose()
            }
            this.scene.remove(this.mesh)
        }
    }
}
