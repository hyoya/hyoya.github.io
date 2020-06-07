#include<iostream>
#include<queue>

using namespace std;

template<class T>
class _vector {
public:
	int _size;
	int capacity;
	T *arr;
	_vector() {
		_size = 0;
		capacity = 32;
		arr = new T[capacity];
	}
	_vector(int k) {
		_size = k;
		capacity = k;
		arr = new T[capacity];
	}
	~_vector() {
		delete[] arr;
	}
	void clear() {
		delete[] arr;
		_size = 0;
		capacity = 32;
		arr = new T[capacity];
	}
	void resize(int k) {
		T *temp;
		temp = new T[k];
		for (int i = 0; i < _size; i++) {
			temp[i] = arr[i];
		}
		delete[] arr;
		arr = temp;
		_size = capacity = k;
	}
	int size() const {
		return _size;
	}
	T* begin() const {
		return &arr[0];
	}

	T* end() const {
		return &arr[0] + _size;
	}

	void push_back(T val) {
		if (_size == capacity) {
			resize(_size * 2);
			_size /= 2;
		}
		arr[_size++] = val;
	}
	void pop_back() {
		_size--;
	}

	T& operator [](int idx) {
		return arr[idx];
	}
	T operator[](int idx) const {
		return arr[idx];
	}

};

const int MAXSIZE = 100;

typedef struct PQ {
	int heap[MAXSIZE];
	int size;

	priority_queue() {
		size = 0;
	}

	void swap(int *a, int *b) {
		int tmp = *a;
		*a = *b;
		*b = tmp;
	}

	int push(int value) {
		if (size + 1 > MAXSIZE) {
			return 0;
		}
		heap[size] = value;
		int current = size;
		int parent = (size - 1) / 2;

		while (current > 0 && heap[current] > heap[parent]) {
			swap(&heap[current], &heap[parent]);
			current = parent;
			parent = (parent - 1) / 2;
		}

		size++;
		return 1;
	}

	int pop() {
		if (size <= 0) return -1;
		int ret = heap[0];
		size--;

		heap[0] = heap[size];
		int current = 0;
		int lc = current * 2 + 1;
		int rc = current * 2 + 2;
		int maxNode = current;

		while (lc < size) {
			if (heap[maxNode] < heap[lc]) {
				maxNode = lc;
			}
			if (rc < size && heap[maxNode] < heap[rc]) {
				maxNode = rc;
			}
			if (maxNode == current) {
				break;
			}
			else {
				swap(&heap[current], &heap[maxNode]);
				current = maxNode;
				lc = current * 2 + 1;
				rc = current * 2 + 2;
			}
		}
		return ret;
	}

	int peak() {
		return heap[0];
	}

	int empty() {
		if (size == 0) {
			return 1;
		}
		else return 0;
	}
}PQ;

typedef struct Node{
	int end;
	int val;
}node;

const int inf = 987654321;
const int MAX_V = 20001;
const int MAX_E = 300001;

int start_node_num, V, E;
int res;

// 각 노드의 엣지를 저장하는 벡터
// 0번 인덱스는 버린다.
_vector<Node> edge_arr[MAX_E];

//출발 노드에서부터의 거리를 저장하는 배열
int dist[MAX_V] = { 0, };

void dijkstra() {
	priority_queue<pair<int, int>> pq;
	pq.push({ 0, start_node_num });

	//노드의 거리 갱신은 v-1번 만큼 하면 된다.
	while (!pq.empty()) {
		int now_node = pq.top().second;
		int cost = -1 * pq.top().first;
		pq.pop();

		//현재 노드에서 부터 주변에 있는 애들의 값을 갱신한다.
		for (int k = 0; k < edge_arr[now_node].size(); k++) {
			int new_val = dist[now_node] + edge_arr[now_node][k].val;
			int before_val = dist[edge_arr[now_node][k].end];

			//현재 노드로부터 연결된 엣지의 목적지 까지 가는 거리와 기존의 거리를 비교하여,
			// 기존의 것이 더 크면 값을 갱신한다.
			if (new_val < before_val) {
				dist[edge_arr[now_node][k].end] = new_val;
				pq.push({ -1 * new_val, edge_arr[now_node][k].end });
			}
		}

	}
}

int main() {
	cin >> V >> E >> start_node_num;

	int from, to, val;
	for (int i = 0; i < E; i++) {
		scanf("%d %d %d", &from, &to, &val);
		edge_arr[from].push_back(Node{ to,val });
	}

	for (int i = 1; i <= V; i++) {
		dist[i] = inf;
	}
	dist[start_node_num] = 0;
	

	dijkstra();
	cout << V << endl;
	for (int i = 1; i <= V; i++) {
		if (dist[i] != inf) printf("%d\n", dist[i]);
		else printf("INF\n");
	}
	return 0;
}
