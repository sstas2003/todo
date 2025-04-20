import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three';
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  removing?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const mount = useRef<HTMLCanvasElement>(null);
  const [sceneInitialized, setSceneInitialized] = useState(false);

  useEffect(() => {
    if (!mount.current || sceneInitialized) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      canvas: mount.current
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Усиливаем освещение
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3, 100);
    scene.add(pointLight);

    // Создаем звезды
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 300;
      positions[i + 1] = (Math.random() - 0.5) * 300;
      positions[i + 2] = (Math.random() - 0.5) * 300;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.5,
      sizeAttenuation: true 
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Создаем Солнце
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffdd00,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Создаем планеты
    const planets = [
      { radius: 2, distance: 20, color: 0x888888, speed: 0.02 },
      { radius: 3, distance: 30, color: 0xffa500, speed: 0.015 },
      { radius: 4, distance: 45, color: 0x4444ff, speed: 0.01 },
      { radius: 3.5, distance: 60, color: 0xff4444, speed: 0.008 }
    ];

    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: planet.color,
        shininess: 30,
        specular: 0x666666
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = planet.distance;
      
      const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.2, planet.distance + 0.2, 128);
      const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x666666,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      
      const pivot = new THREE.Object3D();
      pivot.add(mesh);
      scene.add(pivot);
      
      return { mesh, pivot, speed: planet.speed };
    });

    camera.position.z = 120;
    camera.position.y = 30;
    camera.lookAt(0, 0, 0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      planetMeshes.forEach(({ pivot, speed }) => {
        pivot.rotation.y += speed;
      });

      renderer.render(scene, camera);
    };

    animate();
    setSceneInitialized(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sceneInitialized]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, removing: true } : todo
    ));

    setTimeout(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, 300);
  };

  return (
    <>
      <canvas ref={mount} className="scene-container" />
      <div className="container">
        <h1>Todo List</h1>
        <div className="input-container">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Добавить задачу..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Добавить</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`${todo.completed ? 'completed' : ''} ${todo.removing ? 'removing' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App
