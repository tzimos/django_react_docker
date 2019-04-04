#!/bin/bash
export API_HOST="http://$(ip route get 8.8.8.8 | awk 'NR==1 {print $NF}'):8000/backend"
