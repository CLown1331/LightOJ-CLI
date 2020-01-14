#include <bits/stdc++.h>
using namespace std;
#pragma GCC diagnostic warning "-std=c++11"
using ll = long long;
const int sz = 1e4 + 10;
const ll mod = 1e9 + 7;
ll fac[sz];
ll ans;
int tr[sz], root;
vector < int > G[sz];

ll big_mod( ll b, ll p ) {
    ll ret = 1;
    for( ; p>0; p >>= 1 ) {
            if( p&1 ) ret = ( ret * b ) % mod;
            b = ( b * b ) % mod;
    }
    return ret % mod;
}

ll mod_inv( ll b ) {
    return big_mod( b, mod - 2 );
}

ll nCr( int n, int r ) {
    ll a = fac[n];
    ll b = fac[r];
    ll c = fac[n - r];
    ll d = mod_inv( ( b * c ) % mod );
    return ( a * d ) % mod;    
}

ll rec( int u ) {
    ll ret = 1;
    tr[u] = 0;
    for( const int& v: G[u] ) {
        ret = ( ret * rec( v ) ) % mod;
        tr[u] += tr[v];
        ret = ( ret * nCr( tr[u], tr[v] ) ) % mod;
    }
    tr[u] += 1;
    return ret;
}

int main() {
    
    fac[0] = 1;
    for( int i=1; i<sz; i++ ) {
        fac[i] = ( fac[i - 1] * i ) % mod;
    }
    
    int t, n;
    
    scanf( "%d", &t );
    
    for( int cs=1; cs<=t; cs++ ) {

        scanf( "%d", &n );

        for( int i=1; i<=n; i++ ) G[i].clear();

        memset( tr, 0, sizeof tr );

        for( int i=1; i<n; i++ ) {
                int x, y;
                scanf( "%d %d", &x, &y );
                G[ x ].push_back( y );
                tr[y]++;
        }

        for( int i=1; i<=n; i++ ) {
                if( tr[i] == 0 ) {
                        root = i;

                }
        }
        printf( "Case %d: %lld\n", cs, rec( root ) );
    }
    return 0;
}
