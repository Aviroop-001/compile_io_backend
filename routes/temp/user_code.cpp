#include<bits/stdc++.h>
using namespace std;
int main(){
    cout<<"Hello world"<<endl;
    int n, e, k;
    cin>>n;
    vector<int> vec(n,0);
    for(int i=0; i<n; i++){
        cin>>e;
        vec[i]=e;
    }
    for(auto i: vec)
        cout<<i<<"\n";
    cin>>k;
    cout<<"This is k: "<<k<<endl;
    return 0;
}