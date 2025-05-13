#include <iostream>
vector<int> vis(100,0);
void loadQuestion(int q1,string question)
{
    vector<pair<pair<int,string>,int>> vect
    vect.push_back({{q1,question},0})
}
int ramdonQuestion(){
    int random = rand()%100;
    int prev = 0;
    for(int i =0;i<vect.size();i++){
        if(random == vect[i].first.first && vect[i].second == 0)
        {
            vect[i].second = 1;
            vect[prev].second = 0;
            prev = i;
            vis[random] = 1;
            return random;
        }
    }
    return 0;
}
int main() {
    // Write C++ code here
    std::cout << "Try programiz.pro";

    return 0;
}