import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Aiko } from './Aiko'
import { AikoEnvironment } from './AikoEnvironment'
import { AikoLights } from './AikoLights'

export class AikoThreeScene {
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    private container: HTMLElement
    private frameId: number | null = null
    private loadingCallback: (loading: boolean) => void
    private controls: OrbitControls | null = null

    private aiko: Aiko | null = null
    private environment: AikoEnvironment | null = null
    private lights: AikoLights | null = null

    constructor(container: HTMLElement, loadingCallback: (loading: boolean) => void, isDebug: boolean = false) {
        this.container = container
        this.loadingCallback = loadingCallback

        console.log('[AikoThreeScene] initializing...', { isDebug, containerSize: `${container.clientWidth}x${container.clientHeight}` })

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x0c0c14)
        this.scene.fog = new THREE.Fog(0x0c0c14, 2, 50)

        const width = this.container.clientWidth || 800
        const height = this.container.clientHeight || 600
        const aspect = width / height

        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
        this.camera.position.set(0, 1.5, 6)
        this.camera.lookAt(0, 1, 0)

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        })
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        this.container.appendChild(this.renderer.domElement)

        if (isDebug) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            this.controls.enableDamping = true

            const axesHelper = new THREE.AxesHelper(10)
            this.scene.add(axesHelper)

            // Add a reactive test cube to verify lights
            const testBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    roughness: 0.5,
                    metalness: 0.5
                })
            )
            testBox.position.set(2, 1, 0)
            this.scene.add(testBox)

            console.log('[AikoThreeScene] debug mode: axes and reactive test box added')
        }

        this.environment = new AikoEnvironment(this.scene, isDebug)
        this.lights = new AikoLights(this.scene, isDebug)

        // Spawn Aiko
        this.aiko = new Aiko(this.scene, this.camera, () => {
            console.log('[AikoThreeScene] aiko loaded')
            if (this.aiko?.mesh && this.lights) {
                this.lights.setSpotLightTarget(this.aiko.mesh)
            }
            this.loadingCallback(false)
        })

        this.animate()
    }

    private animate = () => {
        this.frameId = requestAnimationFrame(this.animate)

        const time = Date.now() * 0.001

        if (this.aiko) {
            this.aiko.update(time)
        }

        if (this.lights) {
            this.lights.update()
        }

        if (this.controls) {
            this.controls.update()
        }

        this.renderer.render(this.scene, this.camera)
    }

    public handleResize() {
        const w = this.container.clientWidth
        const h = this.container.clientHeight
        if (w === 0 || h === 0) return

        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(w, h)

        if (this.aiko) {
            this.aiko.handleResize()
        }
    }

    public destroy() {
        console.log('[AikoThreeScene] destroying...')
        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId)
        }
        if (this.aiko) this.aiko.destroy()
        if (this.environment) this.environment.destroy()
        if (this.lights) this.lights.destroy()
        if (this.controls) this.controls.dispose()

        this.renderer.dispose()
        this.scene.clear()
        if (this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement)
        }
    }
}
